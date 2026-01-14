import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { Metadata } from "@/actions/createCheckoutSession";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("❌ STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("❌ Stripe webhook verification failed:", err);
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await handleCheckoutCompleted(session);
    } catch (error) {
      console.error("❌ Failed processing checkout.session.completed:", error);
      return NextResponse.json(
        { error: "Webhook processing failed" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}

/* -------------------------------------------------------------------------- */
/*                                CORE LOGIC                                  */
/* -------------------------------------------------------------------------- */

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const {
    id: sessionId,
    metadata,
    amount_total,
    currency,
    payment_intent,
    total_details,
    customer,
    customer_email,
  } = session;

  if (!metadata) {
    throw new Error("Missing metadata on Stripe session");
  }

  const {
    orderNumber,
    customerName,
    customerEmail,
    clerkUserId,
    address,
  } = metadata as unknown as Metadata & { address?: string };

  const parsedAddress = address ? JSON.parse(address) : null;

  /* -------------------------- IDEMPOTENCY CHECK --------------------------- */

  const existingOrder = await backendClient.fetch(
    `*[_type == "order" && stripeCheckoutSessionId == $sessionId][0]`,
    { sessionId }
  );

  if (existingOrder) {
    console.log("⚠️ Order already exists, skipping:", sessionId);
    return existingOrder;
  }

  /* -------------------------- FETCH LINE ITEMS ----------------------------- */

  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
    expand: ["data.price.product"],
  });

  const sanityProducts: Array<{
    _key: string;
    product: {
      _type: "reference";
      _ref: string;
    };
    quantity: number;
  }> = [];
  const stockUpdates: { productId: string; quantity: number }[] = [];

  for (const item of lineItems.data) {
    const product = item.price?.product as Stripe.Product | null;
    const productId = product?.metadata?.id;
    const quantity = item.quantity ?? 0;

    if (!productId || quantity <= 0) continue;

    sanityProducts.push({
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: productId,
      },
      quantity,
    });

    stockUpdates.push({ productId, quantity });
  }

  /* ----------------------------- SANITY TX -------------------------------- */

  const tx = backendClient.transaction();

  tx.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: sessionId,
    stripePaymentIntentId: payment_intent,
    stripeCustomerId: customer ?? null,
    customerName,
    email: customerEmail ?? customer_email,
    clerkUserId: clerkUserId ?? null,
    currency,
    totalPrice: amount_total ? amount_total / 100 : 0,
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100
      : 0,
    products: sanityProducts,
    status: "paid",
    orderDate: new Date().toISOString(),
    address: parsedAddress
      ? {
          name: parsedAddress.name,
          address: parsedAddress.address,
          city: parsedAddress.city,
          state: parsedAddress.state,
          zip: parsedAddress.zip,
        }
      : null,
  });

  for (const { productId, quantity } of stockUpdates) {
    tx.patch(productId, (p) =>
      p.dec({ stock: quantity })
    );
  }

  await tx.commit();

  console.log("✅ Order + stock successfully committed:", orderNumber);
}

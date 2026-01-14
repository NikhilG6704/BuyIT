"use server";

import stripe from "@/lib/stripe";
import { Address } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";
import Stripe from "stripe";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId?: string;
  address?: Address | null;
}

export interface GroupedCartItems {
  product: CartItem["product"];
  quantity: number;
}

export async function createCheckoutSession(
  items: GroupedCartItems[],
  metadata: Metadata
) {
  try {
    // Ensure base URL exists and is valid
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl || !baseUrl.startsWith("http")) {
      throw new Error("NEXT_PUBLIC_BASE_URL must include http:// or https://");
    }

    // Retrieve existing customer or create a new one
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    const customerId =
      customers.data.length > 0 ? customers.data[0].id : undefined;

    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],

      invoice_creation: {
        enabled: true,
      },

      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        ...(metadata.clerkUserId && { clerkUserId: metadata.clerkUserId }),
        ...(metadata.address && {
          address: JSON.stringify(metadata.address),
        }),
      },

      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${baseUrl}/cart`,

      line_items: items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round((item.product?.price ?? 0) * 100),
          product_data: {
            name: item.product?.name || "Unknown Product",
            description: item.product?.description,
            metadata: {
              id: item.product?._id ?? "",
            },
            images: item.product?.images?.length
              ? [urlFor(item.product.images[0]).url()]
              : undefined,
          },
        },
      })),
    };

    if (customerId) {
      sessionPayload.customer = customerId;
    } else {
      sessionPayload.customer_email = metadata.customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionPayload);

    return session.url;
  } catch (error) {
    console.error("❌ Error creating Stripe Checkout Session:", error);
    throw error;
  }
}

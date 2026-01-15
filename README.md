Here’s a **clean, professional, and eye-catching README.md** you can drop straight into your GitHub repo for **BuyIT**. It’s written to look *production-ready*, recruiter-friendly, and open-source polished.

---

````md
# 🛒 BuyIT – Modern E-Commerce Platform

BuyIT is a **modern, fully functional e-commerce application** built from scratch using the **MERN stack**, **Next.js**, **Tailwind CSS**, **Sanity**, **Clerk**, **Stripe**, and **Vercel**.

This project demonstrates how to build a **production-ready online store** with authentication, secure payments, CMS-driven products, and scalable deployment best practices.

---

## 🚀 Live Demo

🔗 **Live Website:**  
https://buy-it-silk.vercel.app/

---

## ✨ Features

- 🛍️ Product listing & product details
- 🛒 Persistent shopping cart
- 🔐 Secure authentication with **Clerk**
- 💳 Stripe checkout & payment processing
- 📦 CMS-driven product management with **Sanity**
- ⚡ Fast, SEO-friendly **Next.js App Router**
- 📱 Fully responsive UI with **Tailwind CSS**
- 🔄 Global state management using **Zustand**
- 🚀 Production-ready deployment on **Vercel**

---

## 🧩 Tech Stack

### Frontend
- **Next.js (App Router)**
- **React**
- **Tailwind CSS**
- **Zustand**

### Backend & Services
- **Node.js**
- **MongoDB**
- **Sanity CMS**
- **Clerk Authentication**
- **Stripe Payments**

### DevOps & Tooling
- **Stripe CLI**
- **Vercel Deployment**

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root and add the following:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_READ_TOKEN=
SANITY_API_TOKEN=

# Stripe
STRIPE_SECRET_KEY=
````


---

## 📦 Required Libraries

Key dependencies used in this project:

```bash
next
react
tailwindcss
zustand
@clerk/nextjs
stripe
@sanity/client
```

---

## ▶️ Running the Project Locally

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Generate Sanity Types (Optional)

```bash
npm run typegen
```

### 3️⃣ Start the Development Server

```bash
npm run dev
```

The application will be available at:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 💳 Stripe Webhooks (Required for Payments)

### Install Stripe CLI

👉 [https://docs.stripe.com/stripe-cli](https://docs.stripe.com/stripe-cli)

### Login to Stripe

```bash
stripe login
```

### Start Webhook Listener

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

⚠️ Copy the generated **webhook secret** and add it to your environment variables if required.

---

## 🧠 Sanity Setup

1. Create a Sanity project
2. Add your product schemas
3. Set the dataset to `production`
4. Generate API tokens
5. Add all Sanity credentials to `.env.local`

---

## 🚀 Deployment

This project is optimized for **Vercel**.

```bash
npm run build
```

**Deployment Steps:**

1. Push the project to GitHub
2. Import the repository into Vercel
3. Add environment variables
4. Deploy 🎉

---

## 📌 Project Purpose

BuyIT was built to demonstrate:

* Real-world e-commerce architecture
* Secure authentication & payments
* CMS-driven content workflows
* Scalable frontend patterns with Next.js
* Production-ready deployment practices

---

## 🧑‍💻 Author

**BuyIT** — Built with ❤️ to showcase modern full-stack development.

If you like this project, don’t forget to ⭐ the repo!

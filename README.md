# 🛒 BuyIT — Modern E-Commerce Platform
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwind-css&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe&logoColor=white)
![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?logo=sanity)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF)
![Zustand](https://img.shields.io/badge/Zustand-State%20Management-000000)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel)
![Stars](https://img.shields.io/github/stars/NikhilG6704/BuyIT?style=social)
![Forks](https://img.shields.io/github/forks/NikhilG6704/BuyIT?style=social)


![BuyIT Banner](images/logo123.png)

**BuyIT** is a modern, full-stack e-commerce web application designed for real-world scalability and performance. It allows users to browse products, manage carts, place secure orders, and track purchases — all with a smooth, responsive UI.

The platform also features a powerful **admin dashboard**, **authentication**, **CMS-driven products**, and **Stripe-powered payments**.

🌐 **Live Demo:**
👉 [https://buy-it-silk.vercel.app/](https://buy-it-silk.vercel.app/)

🎥 **Video Walkthrough:**
👉 [https://drive.google.com/file/d/1mlh2zpJeCuC_ywcX6-ABxt-Hw3vYF4Pc/view?usp=sharing](https://drive.google.com/file/d/1mlh2zpJeCuC_ywcX6-ABxt-Hw3vYF4Pc/view?usp=sharing)

---

## ✨ Features

### 🧑‍💻 User Features

* Secure authentication with **Clerk**
* Browse products with real-time data
* Add & manage items in cart
* Secure checkout with **Stripe**
* View order history & order status
* Responsive UI for all devices

### 🛠️ Admin Features

* Product management via **Sanity CMS**
* Order tracking & fulfillment
* Scalable content management
* Secure webhook handling

---

## 🧰 Tech Stack

### Frontend

* **Next.js 15**
* **React**
* **Tailwind CSS 14**
* **Zustand** (state management)

### Backend / Services

* **Sanity CMS**
* **Clerk Authentication**
* **Stripe Payments**
* **Stripe Webhooks**

---

## 📸 Screenshots

### 🏠 Home Page

![Home Page](images/home.png)

### 🛒 Cart Page

![Cart Page](images/cart.png)

### 🛍️ Shop Page

![Shop Page](images/shop.png)

### 📝 Blog Page

![Blog Page](images/blog.png)

---

## 🔐 Environment Variables

Create a `.env` file in the root directory and add the following:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=......
CLERK_SECRET_KEY=......

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=......
NEXT_PUBLIC_SANITY_DATASET=......
SANITY_API_READ_TOKEN=......
SANITY_API_TOKEN=......

# Stripe
STRIPE_SECRET_KEY=......
STRIPE_WEBHOOK_SECRET=......
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/NikhilG6704/BuyIT.git
cd buy-it
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Generate Sanity Types

```bash
npm run typegen
```

### 4️⃣ Start Development Server

```bash
npm run dev
```

Your app will be available at:
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

⚠️ Copy the generated **webhook secret** and add it to your `.env` file as:

```env
STRIPE_WEBHOOK_SECRET=whsec_******
```

---

## 📌 Project Status

✅ Actively maintained
✅ Production-ready architecture
✅ Scalable & modular codebase

---

## 🤝 Contributing

Contributions are welcome!
Feel free to open an issue or submit a pull request.

---

## ⭐ Support

If you like this project, don’t forget to **star ⭐ the repository** — it really helps!

import { Poppins } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata = {
  title: {
    template: "%s - Shopcard Online store",
    default: "Shopcart online store",
  },
  description: "Shopcart online store, Your one step for shop all your needs",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.className} antialiased`}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

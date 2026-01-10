import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {children}

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#000000",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
};
export default RootLayout;

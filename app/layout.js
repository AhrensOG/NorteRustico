"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import GlobalContext from "./context/GlobalContext";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Toaster } from "sonner";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta content="Created By GrupoStart" />
      <title>Norte Rustico</title>
      <GlobalContext>
        <body className={`${roboto.className} flex flex-col min-h-screen`}>
          <Toaster
            closeButton
            richColors
            visibleToasts={5}
            // toastOptions={{ style: { background: "white", color: "#e26928" } }}
            duration={5000}
            position="bottom-right"
            expand
          />
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </body>
      </GlobalContext>
    </html>
  );
}

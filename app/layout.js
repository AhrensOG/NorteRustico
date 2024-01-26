'use client'
import { Roboto } from "next/font/google";
import "./globals.css";
import GlobalContext from "./context/GlobalContext";

const roboto = Roboto({ subsets: ["latin"], weight: [ "100", "300", "400", "500", "700", "900" ] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" title="Norte Rustico" content="Created By GrupoStart" >
      <meta content="Created By GrupoStart" />
      <title>Norte Rustico</title>
      <GlobalContext>
        <body className={roboto.className}>{children}</body>
      </GlobalContext>
    </html>
  );
}

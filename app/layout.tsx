import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "RAJIA ENTERPRISES | House of VESTO® — Manufacturer & Exporter",
  description:
    "Rajia Enterprises is a premier textile manufacturer & global exporter based in Faisalabad, Pakistan. Official home of VESTO® men's cotton vests & undershirts. 200,000 pcs monthly capacity.",
  keywords: [
    "Rajia Enterprises",
    "VESTO",
    "men's vest manufacturer",
    "textile exporter Faisalabad",
    "cotton undershirt bulk supply",
    "garment export Pakistan",
    "FOB Karachi wholesale",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 font-sans">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

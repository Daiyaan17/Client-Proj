import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Venus Electrical Trading Co | Industrial & Residential Electrical Supplies",
  description:
    "Authorised supplier of wires, MCBs, switches, lighting and switchgear in Chennai. Ask our AI Assistant for wire sizing and catalog queries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${ibmPlexSans.variable} font-sans antialiased bg-[#F8FAFC]`}>
        <ShopProvider>{children}</ShopProvider>
      </body>
    </html>
  );
}

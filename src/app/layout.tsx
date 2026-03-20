import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Outfit } from 'next/font/google';
import "./globals.css";
import { Toaster } from "sonner";

const outfit = Outfit({ 
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'] 
});

export const metadata: Metadata = {
  title: "Carvio India – Careers, Simplified",
  description: "Find relevant job opportunities without the noise. Carvio delivers curated alerts tailored to your preferences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.className} bg-[#0B0F14] text-[#E6EDF3] antialiased`}>
        {children}
        <Toaster richColors expand position="top-right" />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import LiveChat from "@/src/components/LiveChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QSpace - Your Space to Learn, Create, and Lead",
  description: "Discover scholarships, master new skills, and accelerate your academic and professional journey with curated resources designed for success.",
  keywords: ["scholarships", "education", "learning", "career development", "digital skills"],
  authors: [{ name: "QSpace Team" }],
  openGraph: {
    title: "QSpace - Your Space to Learn, Create, and Lead",
    description: "Discover scholarships, master new skills, and accelerate your academic and professional journey with curated resources designed for success.",
    type: "website",
    siteName: "QSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "QSpace - Your Space to Learn, Create, and Lead",
    description: "Discover scholarships, master new skills, and accelerate your academic and professional journey with curated resources designed for success.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <LiveChat />
      </body>
    </html>
  );
}

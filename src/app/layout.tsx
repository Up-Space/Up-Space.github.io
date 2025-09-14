import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import LiveChat from "@/src/components/LiveChat";

// Define font variables
const headingFont = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
});

const bodyFont = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: "UpSpace - Your Space to Learn, Create, and Lead",
  description: "Discover scholarships, master new skills, and accelerate your academic and professional journey with curated resources designed for success.",
  keywords: ["scholarships", "education", "learning", "career development", "digital skills"],
  authors: [{ name: "UpSpace Team" }],
  openGraph: {
    title: "UpSpace - Your Space to Learn, Create, and Lead",
    description: "Discover scholarships, master new skills, and accelerate your academic and professional journey with curated resources designed for success.",
    type: "website",
    siteName: "UpSpace",
  },
  twitter: {
    card: "summary_large_image",
    title: "UpSpace - Your Space to Learn, Create, and Lead",
    description: "Discover scholarships, master new skills, and accelerate your academic and professional journey with curated resources designed for success.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
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

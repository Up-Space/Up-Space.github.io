import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import LiveChat from "../components/LiveChat.js";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Scholars Scribe - Your Academic Success Hub",
  description: "Discover career advancement tips, scholarships, coding courses, and more to accelerate your academic and professional journey.",
  icons: {
    icon: '/favicon.ico', // Change this line to point to your new favicon file
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <LiveChat />
      </body>
    </html>
  );
}
 
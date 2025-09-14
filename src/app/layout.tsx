import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import LiveChat from "@/src/components/LiveChat";
import { getCategories } from "@/src/utils/data-fetcher"; // Import the data fetching utility

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

// Add 'async' to make the function able to await for data
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch the categories data here, outside the component function
  const { categories } = await getCategories();

  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        {/* Pass the fetched categories to the Header component */}
        <Header categories={categories} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <LiveChat />
      </body>
    </html>
  );
}

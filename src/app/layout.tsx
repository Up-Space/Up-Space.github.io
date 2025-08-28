
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Scholars Space - Your Space to Learn, Create, and Lead',
  description: 'Academic excellence hub for scholarships, courses, and career development',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

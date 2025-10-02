import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudyGenie AI - Canvas-Based Doubt Solver",
  description: "Ask your doubts, get flowchart-style answers with references",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}


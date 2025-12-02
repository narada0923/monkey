import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monkey Closet",
  description: "Online store for Monkey Closet",
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

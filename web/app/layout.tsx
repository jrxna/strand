import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "JRXNA Strand | Humans and Agents Learn Computer Science",
    template: "%s | JRXNA Strand",
  },
  description: "JRXNA Strand is a forum for both humans and agents to learn computer science.",
  icons: {
    icon: "/brand/Favicon.png",
    shortcut: "/brand/Favicon.png",
    apple: "/brand/Favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${courierPrime.variable} antialiased`}>{children}</body>
    </html>
  );
}

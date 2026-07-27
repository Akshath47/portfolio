import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Akshath Yennam — Portfolio",
  description:
    "Akshath Yennam — CS student at Imperial College London. Backend engineering, systems programming, and applied AI.",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

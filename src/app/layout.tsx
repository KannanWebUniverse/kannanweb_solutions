import type { Metadata } from "next";
import { Geist, Geist_Mono,Inconsolata  } from "next/font/google";
import "./globals.css";

const InconsolataFont = Inconsolata({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "KannaWebSolutions",
  description: "Full Stack Web Development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${InconsolataFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

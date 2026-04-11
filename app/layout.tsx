import type { Metadata } from "next";
import { Courier_Prime, Doto } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier",
});

const doto = Doto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-doto-internal",
});

export const metadata: Metadata = {
  title: "Developer Portfolio | Sangramjit Dutta",
  description:
    "Full-stack developer passionate about building exceptional digital experiences. Check out my projects and get in touch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${courierPrime.variable} ${doto.variable} font-mono antialiased dark`}
      >
        {children}
        <Toaster />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}

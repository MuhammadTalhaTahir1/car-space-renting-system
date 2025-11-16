import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "ParkSpace - Car Space Renting System",
  description: "Find and rent parking spaces easily",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: "ParkSpace - Car Space Renting System",
    description: "Find and rent parking spaces easily",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ReactQueryProvider>
          <Navigation />
          {children}
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}

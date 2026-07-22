import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import CommandPalette from "@/components/CommandPalette";
import NewPostModal from "@/components/NewPostModal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Chandu Atluri | Senior Cloud Security Architect",
    template: "%s | Chandu Atluri",
  },
  description:
    "Chandu Atluri, CISSP — Senior Cloud Security Architect specializing in Zero Trust, GCP & Azure security, and identity architecture. Writing on AI, cloud, and cybersecurity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CommandPalette />
          <NewPostModal />
        </ThemeProvider>
      </body>
    </html>
  );
}

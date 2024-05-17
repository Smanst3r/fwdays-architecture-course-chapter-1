import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils"
import "./globals.css";

// TODO: show success|error on CRUD todo item (try to make it with toast)
// TODO: fix body is jumping on shadcn components click (select, dropdown, ...)
// TODO: use Date range component for date filtering

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Todo App Homework",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
      )}>
      <main className="p-8">{children}</main>
      <Toaster />
      </body>
    </html>
  );
}

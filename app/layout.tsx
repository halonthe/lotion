import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import {ThemeProvider} from "@/components/provider/theme-provider";
import {ConvexProvider} from "@/components/provider/convex-provider";
import {Toaster} from "sonner";
import ModalProvider from "@/components/provider/modal-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lotion",
  description: "store your interests, questions, ideas, favorite quotes, reminders, reading and meeting notes easily and future-proof.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ConvexProvider>
        <ThemeProvider
          attribute={"class"}
          defaultTheme={"dark"}
          enableSystem={true}
          disableTransitionOnChange={false}
          storageKey={"lotion-theme"}
      >
            <Toaster position="bottom-center"/>
            <ModalProvider/>
            {children}
        </ThemeProvider>
      </ConvexProvider>
      </body>
    </html>
  );
}

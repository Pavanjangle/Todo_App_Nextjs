"use client";
import React from "react";
import localFont from "next/font/local";
import { MantineProvider } from "@mantine/core";
import { MSWProvider } from "./msw-provider";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@mantine/core/styles.css";
import customTheme from '../theme';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap MantineProvider around MSWProvider */}
        <MantineProvider theme={customTheme}>
          <QueryClientProvider client={queryClient}>
            <MSWProvider>{children}</MSWProvider>
            <ReactQueryDevtools initialIsOpen={true} />
          </QueryClientProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

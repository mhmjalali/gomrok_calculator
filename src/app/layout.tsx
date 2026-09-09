import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const morabba = localFont({
  src: [
    {
      path: "./fonts/morabba/woff2/Morabba-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/morabba/woff2/Morabba-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/morabba/woff2/Morabba-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/morabba/woff2/Morabba-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/morabba/woff2/Morabba-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/morabba/woff/Morabba-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/morabba/woff/Morabba-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/morabba/woff/Morabba-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/morabba/woff/Morabba-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/morabba/woff/Morabba-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-morabba",
  display: "swap",
});

export const metadata: Metadata = {
  title: "محاسبه‌گر فرمول گمرکی — پاوه ۱۴۰۵",
  description: "محاسبه‌گر فرمول گمرکی پاوه، بر اساس فرمول‌های رسمی سال ۱۴۰۵",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className="h-full antialiased">
      <body
        className={`min-h-full flex flex-col bg-canvas text-ink ${morabba.variable} font-(family-name:--font-morabba)`}
      >
        {children}
      </body>
    </html>
  );
}

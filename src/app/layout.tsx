import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "محاسبه‌گر فرمول گمرکی — پاوه ۱۴۰۵",
  description: "محاسبه‌گر فرمول گمرکی پاوه، بر اساس فرمول‌های رسمی سال ۱۴۰۵",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-canvas text-ink font-sans">{children}</body>
    </html>
  );
}

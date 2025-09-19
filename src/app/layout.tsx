import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LLM聊天框组件 | 许海轩",
  description:
    "字节跳动青训营前端方向项目一 | 中国科学技术大学 | 高端智能聊天框组件",
  authors: [{ name: "许海轩", url: "https://github.com/username" }],
  keywords: [
    "LLM",
    "聊天框",
    "AI助手",
    "React组件",
    "Next.js",
    "字节跳动青训营",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVariables = `${geistSans.variable} ${geistMono.variable}`;

  return (
    <ClientLayout fontVariables={fontVariables}>
      {children}
    </ClientLayout>
  );
}

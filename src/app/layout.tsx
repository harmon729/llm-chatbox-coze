"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import InlineBox from "@/components/inlinebox";
import { useState, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 元数据在单独的 metadata.ts 文件中定义

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isInlineBoxVisible, setIsInlineBoxVisible] = useState(false);

  // 添加 Ctrl+K 键盘事件监听器
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 检测 Ctrl+K 组合键
      if (event.ctrlKey && event.key === "k") {
        // 阻止默认行为（如浏览器的搜索功能）
        event.preventDefault();
        // 显示组件
        setIsInlineBoxVisible(true);
      }
    };

    // 添加事件监听器
    document.addEventListener("keydown", handleKeyDown);

    // 清除事件监听器
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // 关闭 InlineBox 的处理函数
  const handleCloseInlineBox = () => {
    setIsInlineBoxVisible(false);
  };

  // 显示 InlineBox 的处理函数
  const handleShowInlineBox = () => {
    setIsInlineBoxVisible(true);
  };

  return (
    <html lang="zh">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar onSearchClick={handleShowInlineBox} />
        <div className="flex justify-center items-center">
          <InlineBox
            isVisible={isInlineBoxVisible}
            onClose={handleCloseInlineBox}
          />
        </div>
        {children}
      </body>
    </html>
  );
}

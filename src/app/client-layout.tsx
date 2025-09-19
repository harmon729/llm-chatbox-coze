"use client";

import Navbar from "../components/layout/navbar";
import InlineBox from "@/components/chat/inlinebox";
import { useState, useEffect } from "react";

interface ClientLayoutProps {
  children: React.ReactNode;
  fontVariables: string;
}

export default function ClientLayout({ children, fontVariables }: ClientLayoutProps) {
  const [isInlineBoxVisible, setIsInlineBoxVisible] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // 初始化主题
  useEffect(() => {
    // 检查本地存储
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    // 检查系统偏好
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // 优先使用保存的主题，如果没有则使用系统偏好
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  // 切换主题函数
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

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
    <html lang="zh" data-theme={theme}>
      <body className={`${fontVariables} antialiased`}>
        <Navbar
          onSearchClick={handleShowInlineBox}
          currentTheme={theme}
          onThemeToggle={toggleTheme}
        />
        <div className="flex justify-center items-center">
          <InlineBox
            isVisible={isInlineBoxVisible}
            onClose={handleCloseInlineBox}
          />
        </div>
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
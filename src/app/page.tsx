"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFeatures, setShowFeatures] = useState(false);

  // 自动播放轮播图
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 观察元素进入视口
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowFeatures(true);
        }
      },
      { threshold: 0.3 }
    );

    const featuresSection = document.getElementById("features-section");
    if (featuresSection) {
      observer.observe(featuresSection);
    }

    return () => {
      if (featuresSection) {
        observer.unobserve(featuresSection);
      }
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* 英雄区域 - 全屏视差背景 */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-base-300/80 to-base-100/90 z-10"></div>

        {/* 动态背景效果 */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-20 bg-grid-pattern"></div>

          {/* 悬浮几何图形 */}
          <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-primary/20 blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-secondary/20 blur-3xl animate-float-medium"></div>
          <div className="absolute top-1/2 right-1/5 w-48 h-48 rounded-full bg-accent/20 blur-3xl animate-float-fast"></div>
        </div>

        {/* 主要内容 */}
        <div className="container max-w-7xl mx-auto px-6 relative z-20 text-center">
          {/* 项目Logo */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg flex items-center justify-center">
              <span className="text-4xl font-bold text-white">LLM</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            智能对话，尽在掌握
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-base-content/80">
            下一代AI聊天框组件，为您的应用注入智能交互能力，提供无缝衔接的用户体验
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/inline_box" className="btn btn-primary btn-lg">
              <span className="mr-2">✨</span>
              探索内联模式
            </Link>
            <Link href="/standalone_box" className="btn btn-outline btn-lg">
              <span className="mr-2">🔍</span>
              体验独立模式
            </Link>
          </div>

          {/* 向下滚动提示 */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-primary/70"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* 功能展示区域 */}
      <section id="features-section" className="py-24 bg-base-100">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 inline-block relative">
              强大功能，优雅实现
              <div
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary rounded-full transform scale-x-0 transition-transform duration-700 ease-out"
                style={{ transform: showFeatures ? "scaleX(1)" : "scaleX(0)" }}
              ></div>
            </h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              我们设计了两种交互模式，满足不同场景的需求，带来极致用户体验
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* 功能卡片1：内联模式 */}
            <div
              className={`card bg-base-200 shadow-lg overflow-hidden transition-all duration-1000 ${
                showFeatures
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <figure className="px-6 pt-6">
                <div className="w-full h-48 bg-primary/10 rounded-xl flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title text-2xl justify-center">内联模式</h3>
                <p className="text-center text-base-content/80">
                  无需离开当前页面，通过快捷键唤起聊天框，实现高效交互
                </p>
                <div className="card-actions justify-center mt-4">
                  <Link href="/inline_box" className="btn btn-sm btn-primary">
                    了解更多
                  </Link>
                </div>
              </div>
            </div>

            {/* 功能卡片2：独立模式 */}
            <div
              className={`card bg-base-200 shadow-lg overflow-hidden transition-all duration-1000 ${
                showFeatures
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <figure className="px-6 pt-6">
                <div className="w-full h-48 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title text-2xl justify-center">独立模式</h3>
                <p className="text-center text-base-content/80">
                  专注的对话体验，适合需要深入交流的场景
                </p>
                <div className="card-actions justify-center mt-4">
                  <Link
                    href="/standalone_box"
                    className="btn btn-sm btn-secondary"
                  >
                    了解更多
                  </Link>
                </div>
              </div>
            </div>

            {/* 功能卡片3：主题定制 */}
            <div
              className={`card bg-base-200 shadow-lg overflow-hidden transition-all duration-1000 ${
                showFeatures
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <figure className="px-6 pt-6">
                <div className="w-full h-48 bg-accent/10 rounded-xl flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title text-2xl justify-center">主题定制</h3>
                <p className="text-center text-base-content/80">
                  支持明暗主题切换，适应不同环境和个人偏好
                </p>
                <div className="card-actions justify-center mt-4">
                  <button className="btn btn-sm btn-accent">切换主题</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 展示轮播 */}
      <section className="py-24 bg-base-200">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">用户体验展示</h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              直观感受我们的聊天框组件为您带来的卓越体验
            </p>
          </div>

          <div className="relative w-full max-w-4xl mx-auto h-96 rounded-2xl overflow-hidden shadow-2xl">
            {/* 轮播图1 */}
            <div
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                currentSlide === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{
                transform: `translateX(${
                  currentSlide === 0 ? 0 : currentSlide < 0 ? 100 : -100
                }%)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
              <div className="absolute left-10 top-1/2 transform -translate-y-1/2 max-w-md z-20">
                <h3 className="text-3xl font-bold mb-4">智能对话体验</h3>
                <p className="text-lg">
                  基于先进的大语言模型，提供自然流畅的交互体验，理解上下文，回答更精准
                </p>
              </div>
              <div className="absolute right-10 bottom-10 w-64 h-64 bg-primary/30 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute right-0 top-0 bottom-0 w-1/2 rounded-xl bg-base-100/60 backdrop-blur-sm flex items-center justify-center">
                <div className="w-4/5 h-4/5 rounded-lg bg-base-100 shadow-md flex flex-col">
                  <div className="bg-primary/10 p-3 rounded-t-lg">
                    LLM智能助手
                  </div>
                  <div className="flex-grow p-4 overflow-y-auto">
                    <div className="chat chat-start">
                      <div className="chat-bubble chat-bubble-primary">
                        您好，有什么我可以帮助您的？
                      </div>
                    </div>
                    <div className="chat chat-end">
                      <div className="chat-bubble chat-bubble-secondary">
                        请介绍一下你的主要功能
                      </div>
                    </div>
                    <div className="chat chat-start">
                      <div className="chat-bubble chat-bubble-primary">
                        我是一个智能助手，可以回答问题、提供信息、帮助创建内容...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 轮播图2 */}
            <div
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                currentSlide === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{
                transform: `translateX(${
                  currentSlide === 1 ? 0 : currentSlide < 1 ? 100 : -100
                }%)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent"></div>
              <div className="absolute left-10 top-1/2 transform -translate-y-1/2 max-w-md z-20">
                <h3 className="text-3xl font-bold mb-4">灵活的部署模式</h3>
                <p className="text-lg">
                  支持内联和独立两种模式，根据您的需求选择最适合的交互方式
                </p>
              </div>
              <div className="absolute right-10 bottom-10 w-64 h-64 bg-secondary/30 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute right-0 top-0 bottom-0 w-1/2 rounded-xl bg-base-100/60 backdrop-blur-sm flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                  <div className="w-72 h-40 bg-base-100 rounded-lg shadow-lg flex flex-col">
                    <div className="bg-secondary/20 p-2 text-xs">内联模式</div>
                    <div className="flex-grow p-2 text-xs">
                      无缝集成在页面中
                    </div>
                  </div>
                  <div className="w-64 h-40 bg-base-100 rounded-lg shadow-lg flex flex-col transform -rotate-6">
                    <div className="bg-primary/20 p-2 text-xs">独立模式</div>
                    <div className="flex-grow p-2 text-xs">专注的对话环境</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 轮播图3 */}
            <div
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                currentSlide === 2 ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{
                transform: `translateX(${
                  currentSlide === 2 ? 0 : currentSlide < 2 ? 100 : -100
                }%)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent"></div>
              <div className="absolute left-10 top-1/2 transform -translate-y-1/2 max-w-md z-20">
                <h3 className="text-3xl font-bold mb-4">优雅的界面设计</h3>
                <p className="text-lg">
                  精心打造的用户界面，结合了美学与实用性，提供卓越的视觉体验
                </p>
              </div>
              <div className="absolute right-10 bottom-10 w-64 h-64 bg-accent/30 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute right-0 top-0 bottom-0 w-1/2 rounded-xl bg-base-100/60 backdrop-blur-sm flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-base-100 rounded-lg shadow-md aspect-square flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-lg">🎨</span>
                    </div>
                  </div>
                  <div className="p-4 bg-base-100 rounded-lg shadow-md aspect-square flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                      <span className="text-lg">✨</span>
                    </div>
                  </div>
                  <div className="p-4 bg-base-100 rounded-lg shadow-md aspect-square flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-lg">🌙</span>
                    </div>
                  </div>
                  <div className="p-4 bg-base-100 rounded-lg shadow-md aspect-square flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-info/20 flex items-center justify-center">
                      <span className="text-lg">🌈</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 轮播控制按钮 */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === index
                      ? "bg-primary w-10"
                      : "bg-base-content/30"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 行动召唤 */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
        <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6">体验AI对话的未来</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            立即探索我们的LLM聊天框组件，为您的应用注入智能交互能力，提升用户体验
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/inline_box"
              className="btn btn-lg btn-primary min-w-[200px] group"
            >
              开始使用
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              href="/about"
              className="btn btn-lg btn-outline min-w-[200px]"
            >
              了解更多
            </Link>
          </div>
        </div>

        {/* 装饰性元素 */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
      </section>

      {/* 作者信息和页脚 */}
      <section className="py-16 bg-base-300/50 border-t border-base-300">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-md flex items-center justify-center mr-4">
                  <span className="text-lg font-bold text-white">LLM</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">LLM聊天框组件</h3>
                  <p className="text-base-content/70 text-sm">
                    字节跳动青训营前端方向项目一
                  </p>
                </div>
              </div>
              <p className="text-base-content/70 max-w-md">
                一个高端、专业的聊天框组件，为您的应用提供智能交互能力
              </p>
            </div>

            <div className="text-right">
              <div className="mb-2">
                <h4 className="text-lg font-bold">作者</h4>
                <p className="text-base-content/70">许海轩</p>
              </div>
              <div>
                <h4 className="text-lg font-bold">所属机构</h4>
                <p className="text-base-content/70">中国科学技术大学</p>
              </div>
            </div>
          </div>

          <div className="divider my-8"></div>

          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-base-content/60 text-sm">
              &copy; {new Date().getFullYear()} LLM聊天框组件 | 保留所有权利
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="btn btn-circle btn-sm btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="#" className="btn btn-circle btn-sm btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="btn btn-circle btn-sm btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 自定义样式 */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(
            circle,
            currentColor 1px,
            transparent 1px
          );
          background-size: 30px 30px;
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(15px) translateX(-15px);
          }
          50% {
            transform: translateY(0) translateX(-25px);
          }
          75% {
            transform: translateY(-15px) translateX(-10px);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-10px) translateX(-5px);
          }
          50% {
            transform: translateY(5px) translateX(-10px);
          }
          75% {
            transform: translateY(10px) translateX(5px);
          }
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 15s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

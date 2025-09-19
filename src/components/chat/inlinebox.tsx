"use client";

import { useState, useRef, useEffect } from "react";
import { streamChat } from "@/services/cozeService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "../ui/CodeBlock";
import { Components } from "react-markdown";

interface InlineBoxProps {
  isVisible?: boolean;
  onClose?: () => void;
}

export default function InlineBox({
  isVisible = true,
  onClose,
}: InlineBoxProps) {
  const [status, setStatus] = useState<"close" | "open" | "ai">("close");
  const [inputValue, setInputValue] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  // 当AI回复更新时自动滚动到底部
  useEffect(() => {
    if (responseRef.current && status === "ai") {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [aiResponse, status]);

  // 添加ESC键监听
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setStatus("close");
        // 如果提供了onClose回调，则调用它
        if (onClose) {
          onClose();
        }
      }
    };

    // 添加事件监听器
    document.addEventListener("keydown", handleEscKey);

    // 清除事件监听器
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  // 如果组件不可见，则不渲染
  if (!isVisible) {
    return null;
  }

  // 发送消息到CozeAPI
  const handleSendToAI = async () => {
    if (!inputValue.trim() || isLoading) return;

    setIsLoading(true);
    setStatus("ai");
    setAiResponse(""); // 清空之前的回复

    // 创建包含用户消息的文本对象
    const defaultMessage =
      "[不要调用任何工具，请直接回应用户的需求，不要说任何与问题不相关的内容，即使你不明白用户的意图]\n";
    const textMessage = {
      type: "text",
      text: defaultMessage + inputValue,
    };

    // 将消息对象转换为JSON字符串
    const messageContent = JSON.stringify([textMessage]);

    // 使用流式响应，每接收到一部分就立即显示
    streamChat(
      messageContent,
      // 部分响应处理函数 - 每收到一部分就更新显示
      (partialContent: string) => {
        setAiResponse((prev) => prev + partialContent);
      },
      // 完成处理函数
      (fullContent: string) => {
        console.log("收到完整响应，长度:", fullContent.length);
        setIsLoading(false);
      },
      // 错误处理函数
      (error: Error | unknown) => {
        console.error("聊天错误:", error);
        setAiResponse((prev) => prev + "\n\n发生错误，请重试。");
        setIsLoading(false);
      }
    );
  };

  const markdownComponents: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : undefined;
      const isInline = !className; // 如果没有className，通常表示这是内联代码

      return isInline ? (
        <code className={className} {...props}>
          {children}
        </code>
      ) : (
        <CodeBlock
          language={language}
          value={String(children).replace(/\n$/, "")}
        />
      );
    },
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={(e) => {
        // 当点击的是最外层背景元素时调用 onClose
        if (e.target === e.currentTarget && onClose) {
          onClose();
        }
      }}
    >
      <div
        style={{
          transform:
            status === "close" ? "translateY(-200%)" : "translateY(-30%)",
        }}
        className="transition-transform duration-300 ease-in-out max-w-md w-full"
      >
        <div
          tabIndex={0}
          className={`collapse bg-base-100 border-base-300 border w-full shadow-lg ${
            status !== "close" ? "collapse-open" : "collapse-close"
          }`}
        >
          <div className="collapse-title font-semibold p-2">
            <label className="relative flex items-center w-full h-full bg-base-100 input input-bordered px-3 border-0">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                className="grow"
                placeholder="搜索内容"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (e.target.value.trim() !== "") {
                    setStatus("open");
                  } else {
                    setStatus("close");
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && status === "open") {
                    handleSendToAI();
                  }
                }}
              />
              <kbd className="kbd kbd-sm">⌘</kbd>
              <kbd className="kbd kbd-sm">K</kbd>
            </label>
          </div>
          <div className="collapse-content p-0">
            <div className="text-sm flex flex-col">
              {/* 第一层展开内容 - 询问按钮 */}
              <div className="p-2">
                <button
                  className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium text-white transition-all duration-200 ${
                    status === "ai"
                      ? "bg-gray-600 hover:bg-gray-700"
                      : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                  } shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
                  onClick={() => {
                    if (status === "ai") {
                      setStatus("open");
                    } else if (inputValue.trim()) {
                      handleSendToAI();
                    }
                  }}
                >
                  {status === "ai" ? (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 15l7-7 7 7"
                        ></path>
                      </svg>
                      <span>收起回复</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        ></path>
                      </svg>
                      <span>询问AI</span>
                    </>
                  )}
                </button>
              </div>

              {/* 第二层展开内容 - AI回复区域 */}
              <div
                className="transition-all duration-500 ease-in-out overflow-hidden"
                style={{
                  maxHeight: status === "ai" ? "60vh" : "0",
                  opacity: status === "ai" ? 1 : 0,
                }}
              >
                <div
                  ref={responseRef}
                  className="p-4 bg-gray-800 rounded-md m-2 text-gray-100 overflow-y-auto"
                  style={{ maxHeight: "58vh" }}
                >
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2 text-xs font-bold">
                      AI
                    </div>
                    <div className="font-medium">AI助手</div>
                  </div>

                  {isLoading && !aiResponse ? (
                    <div
                      className="flex items-center space-x-2 mt-2"
                      data-testid="loading-indicator"
                    >
                      <div
                        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  ) : aiResponse ? (
                    <div className="markdown whitespace-pre-wrap">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents}
                      >
                        {aiResponse}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm mb-2">
                      请输入您的问题，我将为您提供答案。
                    </p>
                  )}

                  {aiResponse && !isLoading && (
                    <div className="mt-4 flex gap-3">
                      <button
                        className="py-1.5 px-3 rounded-md flex items-center gap-1.5 bg-gray-700 hover:bg-gray-600 text-gray-100 transition-colors duration-200 shadow-sm"
                        onClick={() =>
                          navigator.clipboard.writeText(aiResponse)
                        }
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                          ></path>
                        </svg>
                        <span>复制</span>
                      </button>
                      <button
                        className="py-1.5 px-3 rounded-md flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200 shadow-sm"
                        onClick={() => {
                          setAiResponse("");
                          handleSendToAI();
                        }}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          ></path>
                        </svg>
                        <span>重新生成</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

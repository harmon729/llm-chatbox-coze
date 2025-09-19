"use client";

import { useState } from "react";

export default function InlineBox() {
  const [activeTab, setActiveTab] = useState<"intro" | "usage" | "tips">(
    "intro"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">内联聊天框</h1>
          <p className="text-xl text-base-content/80">
            轻量级的内联AI助手，随时随地为您提供帮助
          </p>
        </div>

        {/* 动态示例区 */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 mb-16 rounded-xl overflow-hidden shadow-2xl bg-base-200 border border-base-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4/5 h-4/5 rounded-lg bg-base-100 shadow-md flex flex-col">
              <div className="bg-primary/10 p-3 rounded-t-lg flex items-center">
                <div className="w-3 h-3 rounded-full bg-error mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-warning mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="ml-3 text-sm font-medium">LLM聊天框</span>
              </div>
              <div className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      AI
                    </div>
                    <div className="ml-3 bg-base-200 p-3 rounded-lg">
                      <p>您好！我是您的AI助手，有什么可以帮助您的吗？</p>
                    </div>
                  </div>
                  <div className="flex items-start justify-end">
                    <div className="mr-3 bg-primary/20 p-3 rounded-lg">
                      <p>请介绍一下这个内联聊天框的功能</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white font-bold">
                      用
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      AI
                    </div>
                    <div className="ml-3 bg-base-200 p-3 rounded-lg">
                      <p>
                        当然！内联聊天框可以通过
                        <span className="font-bold text-primary">Ctrl+K</span>
                        随时唤出，无需离开当前界面即可获取AI帮助...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 border-t border-base-300">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-full bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="输入您的问题..."
                    readOnly
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-primary text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 动画光效 */}
          <div className="absolute -inset-1 opacity-30 animate-pulse bg-gradient-to-r from-primary via-accent to-secondary blur"></div>
        </div>

        {/* 标签页导航 */}
        <div className="tabs tabs-boxed flex justify-center mb-8 bg-base-200">
          <button
            className={`tab ${activeTab === "intro" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("intro")}
          >
            功能介绍
          </button>
          <button
            className={`tab ${activeTab === "usage" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("usage")}
          >
            使用方法
          </button>
          <button
            className={`tab ${activeTab === "tips" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("tips")}
          >
            使用技巧
          </button>
        </div>

        {/* 内容区 */}
        <div className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-300">
          {activeTab === "intro" && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-primary">
                内联聊天框的强大功能
              </h2>
              <p className="text-base-content/80">
                内联聊天框是一个轻量级的AI助手界面，可以在不离开当前页面的情况下随时调用。它为您提供以下强大功能：
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-base-200 p-5 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">快速访问</h3>
                  <p>
                    通过快捷键Ctrl+K随时唤出，无需打开新窗口，保持工作流连贯性。
                  </p>
                </div>

                <div className="bg-base-200 p-5 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">上下文感知</h3>
                  <p>
                    AI助手能够理解您当前的操作环境，提供针对性的帮助和建议。
                  </p>
                </div>

                <div className="bg-base-200 p-5 rounded-lg shadow-md transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">多样化响应</h3>
                  <p>
                    支持文本、代码、图表等多种响应类型，让交互更加丰富和直观。
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "usage" && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-primary">
                如何使用内联聊天框
              </h2>
              <p className="text-base-content/80">
                使用内联聊天框非常简单，只需几个简单的步骤：
              </p>

              <div className="steps steps-vertical md:steps-horizontal">
                <div className="step step-primary">
                  <div className="mt-4">
                    <h3 className="font-bold">唤出聊天框</h3>
                    <p className="text-sm md:text-base">
                      按下<kbd className="kbd kbd-sm">Ctrl</kbd> +{" "}
                      <kbd className="kbd kbd-sm">K</kbd>
                      ，或点击导航栏中的搜索图标
                    </p>
                  </div>
                </div>
                <div className="step step-primary">
                  <div className="mt-4">
                    <h3 className="font-bold">输入问题</h3>
                    <p className="text-sm md:text-base">
                      在输入框中输入您的问题或命令
                    </p>
                  </div>
                </div>
                <div className="step step-primary">
                  <div className="mt-4">
                    <h3 className="font-bold">获取回答</h3>
                    <p className="text-sm md:text-base">
                      AI会立即处理并给出回答，支持连续对话
                    </p>
                  </div>
                </div>
                <div className="step step-primary">
                  <div className="mt-4">
                    <h3 className="font-bold">关闭聊天框</h3>
                    <p className="text-sm md:text-base">
                      完成交互后，按<kbd className="kbd kbd-sm">Esc</kbd>
                      或点击外部区域关闭
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-info/10 p-4 rounded-lg mt-8 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-info mr-3 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p>
                  内联聊天框会自动记住您的对话历史，方便您继续之前的交流。您可以随时清除历史记录重新开始。
                </p>
              </div>
            </div>
          )}

          {activeTab === "tips" && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-bold text-primary">
                使用技巧与最佳实践
              </h2>
              <p className="text-base-content/80">
                掌握这些技巧，让您的内联聊天体验更加高效：
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="card bg-base-200 shadow-md">
                  <div className="card-body">
                    <h3 className="card-title text-secondary">
                      <span className="mr-2">💡</span>
                      使用清晰的问题
                    </h3>
                    <p>
                      提问时尽量具体明确，这将帮助AI更准确地理解您的需求并提供相关答案。
                    </p>
                  </div>
                </div>

                <div className="card bg-base-200 shadow-md">
                  <div className="card-body">
                    <h3 className="card-title text-secondary">
                      <span className="mr-2">⚡</span>
                      使用快捷指令
                    </h3>
                    <p>
                      以&quot;/&quot;开头输入特殊指令，如&quot;/clear&quot;清除历史，&quot;/help&quot;获取帮助列表。
                    </p>
                  </div>
                </div>

                <div className="card bg-base-200 shadow-md">
                  <div className="card-body">
                    <h3 className="card-title text-secondary">
                      <span className="mr-2">🔄</span>
                      利用上下文
                    </h3>
                    <p>
                      AI会记住对话上下文，您可以在后续问题中使用代词，不必重复所有细节。
                    </p>
                  </div>
                </div>

                <div className="card bg-base-200 shadow-md">
                  <div className="card-body">
                    <h3 className="card-title text-secondary">
                      <span className="mr-2">📋</span>
                      复制与引用
                    </h3>
                    <p>
                      点击任何回答右上角的复制图标可快速复制内容，双击文本可选择性复制。
                    </p>
                  </div>
                </div>
              </div>

              <div className="divider my-8">高级技巧</div>

              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>指令</th>
                      <th>功能描述</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <code>/code [语言]</code>
                      </td>
                      <td>生成指定语言的代码示例</td>
                    </tr>
                    <tr>
                      <td>
                        <code>/explain [概念]</code>
                      </td>
                      <td>详细解释某个概念或技术</td>
                    </tr>
                    <tr>
                      <td>
                        <code>/summary</code>
                      </td>
                      <td>总结当前对话的关键点</td>
                    </tr>
                    <tr>
                      <td>
                        <code>/image [描述]</code>
                      </td>
                      <td>根据描述生成相关图像</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* 底部行动号召 */}
        <div className="text-center mt-12">
          <p className="text-base-content/70 mb-4">准备好体验智能对话了吗？</p>
          <div className="flex justify-center gap-4">
            <button
              className="btn btn-primary"
              onClick={() => {
                // 如果有真实的触发函数，这里可以调用
                alert("按Ctrl+K打开内联聊天框！");
              }}
            >
              <span className="mr-2">⌨️</span>
              按Ctrl+K试用
            </button>

            <button className="btn btn-outline btn-secondary">
              了解更多功能
            </button>
          </div>
        </div>
      </div>

      {/* 自定义样式 */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

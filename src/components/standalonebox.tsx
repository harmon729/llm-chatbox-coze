"use client";

import { useState, useRef } from "react";
import { streamChat, uploadFile, retrieveFile } from "@/services/cozeService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MessageType = {
  type: "user" | "ai";
  content: string;
  fileInfo?: {
    id: string;
    filename: string;
    size: number;
    type: string;
    isImage?: boolean;
  };
};

// 文本消息类型
type TextMessage = {
  type: "text";
  text: string;
};

// 图片消息类型
type ImageIdMessage = {
  type: "image";
  file_id: string;
};

// 文件消息类型 - 使用file_id
type FileIdMessage = {
  type: "file";
  file_id: string;
};

// 文件消息类型 - 使用file_url
type FileUrlMessage = {
  type: "file" | "image";
  file_url: string;
};

// 联合类型
type UserMessage =
  | TextMessage
  | ImageIdMessage
  | FileIdMessage
  | FileUrlMessage;

export default function StandaloneBox() {
  const [message, setMessage] = useState(""); // 输入框中的消息文本
  const [currentResponse, setCurrentResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tempFileInfo, setTempFileInfo] = useState<{
    id: string;
    filename: string;
    size: number;
    type: string;
    isImage?: boolean;
    localUrl?: string;
  } | null>(null);
  const responseRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 判断文件是否为图片类型
  const isImageFile = (file: File): boolean => {
    // 获取文件扩展名
    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    // 图片类型扩展名列表
    const imageExtensions = [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "webp",
      "heic",
      "heif",
      "bmp",
      "pcd",
      "tiff",
    ];
    return imageExtensions.includes(extension);
  };

  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      // 选择文件后直接上传
      setTimeout(() => {
        if (files[0]) {
          handleFileUpload(files[0]);
        }
      }, 0);
    }
  };

  // 处理文件上传
  const handleFileUpload = async (file?: File) => {
    const fileToUpload = file || selectedFile;
    if (!fileToUpload) return;

    setUploading(true);
    try {
      const result = await uploadFile(fileToUpload);

      if (result.success && result.fileObj) {
        // 检查是否是图片文件
        const isImage = isImageFile(fileToUpload);

        // 为图片文件创建本地URL
        const localUrl = isImage
          ? URL.createObjectURL(fileToUpload)
          : undefined;

        // 保存文件信息到临时状态，包括本地URL
        setTempFileInfo({
          id: result.fileObj.id,
          filename: fileToUpload.name,
          size: fileToUpload.size,
          type: fileToUpload.type,
          isImage,
          localUrl,
        });

        // 清空选中的文件
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        alert("文件上传失败");
      }
    } catch (error) {
      console.error("上传文件出错:", error);
      alert("上传文件出错");
    } finally {
      setUploading(false);
    }
  };

  // 处理消息发送
  const handleSendMessage = async () => {
    if (!message.trim() && !tempFileInfo && isLoading) return;
    const defaultMessage =
      "[不要调用任何工具，请直接回应用户的需求，不要说任何与问题不相关的内容，即使你不明白用户的意图]\n";
    // 创建新的文本消息对象
    const newTextMessage: TextMessage = {
      type: "text",
      text: defaultMessage + message || defaultMessage, // 确保即使没有文本也有一个空格
    };

    // 创建消息数组，始终包含文本消息
    const messageArray: UserMessage[] = [newTextMessage];

    // 如果有临时文件信息，添加到数组中
    if (tempFileInfo) {
      const isImage = tempFileInfo.isImage;
      if (isImage) {
        const imageMessage: ImageIdMessage = {
          type: "image",
          file_id: tempFileInfo.id,
        };
        messageArray.push(imageMessage);
      } else {
        const fileMessage: FileIdMessage = {
          type: "file",
          file_id: tempFileInfo.id,
        };
        messageArray.push(fileMessage);
      }

      // 创建包含文件信息的用户消息
      const userMessage: MessageType = {
        type: "user",
        content: message, // 只包含用户输入的文本，不再添加"上传文件"文字
        fileInfo: tempFileInfo, // 包含文件信息
      };

      // 添加用户消息到历史记录
      setMessages((prevMessages) => [...prevMessages, userMessage]);
    } else {
      // 保存用户消息用于显示
      const userMessage: MessageType = { type: "user", content: message };
      // 添加用户消息到历史记录
      setMessages((prevMessages) => [...prevMessages, userMessage]);
    }

    setIsLoading(true);
    setCurrentResponse(""); // 清空当前响应

    // 自动滚动到底部
    setTimeout(() => {
      if (responseRef.current) {
        responseRef.current.scrollTop = responseRef.current.scrollHeight;
      }
    }, 10);

    // 将消息数组转换为JSON字符串
    const messageContent = JSON.stringify(messageArray);
    console.log("array", messageContent);

    // 清空messageArray和临时文件信息
    messageArray.length = 0; // 这种方式可以清空数组内容而不改变引用
    if (tempFileInfo && tempFileInfo.localUrl) {
      URL.revokeObjectURL(tempFileInfo.localUrl);
    }
    setTempFileInfo(null); // 清空临时文件信息

    // 使用流式响应，每接收到一部分就立即显示
    streamChat(
      messageContent,
      // 部分响应处理函数 - 每收到一部分就更新显示
      (partialContent: string) => {
        setCurrentResponse((prev) => prev + partialContent);
        // 自动滚动到底部
        setTimeout(() => {
          if (responseRef.current) {
            responseRef.current.scrollTop = responseRef.current.scrollHeight;
          }
        }, 10);
      },
      // 完成处理函数
      (fullContent: string) => {
        console.log("收到完整响应，长度:", fullContent.length);
        // 将AI完整回复添加到消息历史
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "ai", content: fullContent },
        ]);
        setCurrentResponse("");
        setIsLoading(false);
      },
      // 错误处理函数
      (error: Error | unknown) => {
        console.error("聊天错误:", error);
        const errorMessage = "发生错误，请重试。";
        // 添加错误消息到历史记录
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "ai", content: errorMessage },
        ]);
        setCurrentResponse("");
        setIsLoading(false);
      }
    );

    // 发送后清空输入框
    setMessage("");
  };

  return (
    <div className="flex flex-col flex-1 w-full h-[85vh] mx-auto bg-[#343541] text-white rounded-md overflow-hidden">
      {/* 聊天记录显示区域 */}
      <div
        ref={responseRef}
        className="flex-grow overflow-y-auto p-4 space-y-4"
      >
        {messages.length > 0 ? (
          <>
            {/* 渲染历史消息 */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`w-full ${
                  msg.type === "ai" ? "bg-[#444654]" : ""
                } p-4`}
              >
                <div className="max-w-3xl mx-auto flex">
                  <div className="w-[30px] h-[30px] rounded-sm mr-4 flex-shrink-0 flex items-center justify-center">
                    {msg.type === "ai" ? (
                      <div className="bg-[#10a37f] h-full w-full flex items-center justify-center text-white text-xs">
                        AI
                      </div>
                    ) : (
                      <div className="bg-[#5436DA] h-full w-full flex items-center justify-center text-white text-xs">
                        用户
                      </div>
                    )}
                  </div>
                  <div className="whitespace-pre-wrap">
                    {msg.type === "ai" ? (
                      <div className="markdown">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}

                    {/* 显示文件信息（如果有的话） */}
                    {msg.fileInfo && (
                      <div className="mt-2 p-2 bg-[#40414F] rounded-md">
                        <div className="flex items-center">
                          {msg.fileInfo.isImage ? (
                            <div className="flex items-center">
                              <svg
                                className="w-5 h-5 mr-2 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <div className="flex flex-col">
                                <span className="text-white truncate">
                                  {msg.fileInfo.filename}{" "}
                                  <span className="text-green-400">[图片]</span>
                                </span>
                                <span className="text-xs text-gray-400">
                                  {(msg.fileInfo.size / 1024).toFixed(1)} KB ·{" "}
                                  {msg.fileInfo.type}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <>
                              <svg
                                className="w-5 h-5 mr-2 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              <div className="flex flex-col">
                                <span className="text-white truncate">
                                  {msg.fileInfo.filename}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {(msg.fileInfo.size / 1024).toFixed(1)} KB ·{" "}
                                  {msg.fileInfo.type}
                                </span>
                              </div>
                            </>
                          )}
                          <button
                            className="ml-auto p-1 text-gray-400 hover:text-white rounded-md hover:bg-[#4d4e59]"
                            onClick={async () => {
                              try {
                                // 获取文件详情
                                const result = await retrieveFile(
                                  msg.fileInfo!.id
                                );
                                if (result.success && result.fileInfo) {
                                  alert(
                                    `文件ID: ${
                                      result.fileInfo.id
                                    }\n创建时间: ${new Date(
                                      result.fileInfo.created_at * 1000
                                    ).toLocaleString()}\n文件名: ${
                                      result.fileInfo.file_name ||
                                      msg.fileInfo!.filename
                                    }`
                                  );
                                } else {
                                  alert("获取文件详情失败");
                                }
                              } catch (error) {
                                console.error("获取文件详情出错:", error);
                                alert("获取文件详情出错");
                              }
                            }}
                            title="查看文件详情"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* 显示当前正在流式输出的回复 */}
            {isLoading && currentResponse && (
              <div className="w-full bg-[#444654] p-4">
                <div className="max-w-3xl mx-auto flex">
                  <div className="w-[30px] h-[30px] rounded-sm mr-4 flex-shrink-0 bg-[#10a37f] flex items-center justify-center text-white text-xs">
                    AI
                  </div>
                  <div className="whitespace-pre-wrap">
                    <div className="markdown">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {currentResponse}
                      </ReactMarkdown>
                    </div>
                    <span className="ml-1 animate-pulse">▋</span>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            开始对话吧，AI回复将显示在这里
          </div>
        )}
      </div>

      {/* 输入区域 */}
      <div className="p-4 border-t border-gray-700 bg-[#343541]">
        <div className="max-w-3xl mx-auto">
          {/* 显示选中的文件 */}
          {selectedFile && (
            <div className="mb-3 bg-[#444654] rounded-lg p-2.5 flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-white truncate max-w-xs">
                  {selectedFile.name}
                </span>
                <span className="ml-2 text-xs text-gray-400">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
              <button
                className="text-gray-400 hover:text-white ml-2 p-1 hover:bg-[#40414F] rounded"
                onClick={() => {
                  setSelectedFile(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* 显示已上传但未发送的临时文件 */}
          {tempFileInfo && (
            <div className="mb-3 bg-[#444654] rounded-lg p-2.5 flex items-center justify-between">
              <div className="flex items-center flex-grow">
                {tempFileInfo.isImage && tempFileInfo.localUrl ? (
                  <div className="flex flex-col items-center mr-3">
                    <img
                      src={tempFileInfo.localUrl}
                      alt={tempFileInfo.filename}
                      className="max-h-32 max-w-32 rounded-md object-contain"
                    />
                  </div>
                ) : (
                  <svg
                    className="w-5 h-5 mr-2 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                )}
                <div className="flex flex-col">
                  <span className="text-white truncate max-w-xs">
                    {tempFileInfo.filename}
                  </span>
                  <span className="text-xs text-gray-400">
                    {(tempFileInfo.size / 1024).toFixed(1)} KB
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  if (tempFileInfo.localUrl) {
                    URL.revokeObjectURL(tempFileInfo.localUrl);
                  }
                  setTempFileInfo(null);
                }}
                className="text-gray-400 hover:text-white ml-3"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          <div className="flex items-start">
            {/* 文件上传按钮 - 现在在输入框左侧 */}
            <div className="mr-2 mt-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                disabled={isLoading || uploading}
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`p-2 rounded-md ${
                  uploading
                    ? "bg-[#40414F] text-gray-600 cursor-not-allowed"
                    : "hover:bg-[#4d4e59] text-gray-400 hover:text-white"
                } transition-colors`}
                disabled={isLoading || uploading}
                title={uploading ? "正在上传..." : "上传文件"}
              >
                {uploading ? (
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                )}
              </button>

              {/* 如果有选中的文件，显示取消按钮 */}
              {selectedFile && uploading && (
                <div className="mt-2 text-xs text-gray-400 text-center">
                  上传中...
                </div>
              )}
            </div>

            <div className="flex-grow relative shadow-lg rounded-xl overflow-hidden border-[1px] border-gray-600 flex items-end">
              <textarea
                className="w-full bg-[#40414F] resize-none px-4 pt-4 pb-10 min-h-[60px] focus:outline-none text-white placeholder-gray-400"
                placeholder="发送消息..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); // 防止换行
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
                rows={1}
                style={{ maxHeight: "200px" }}
              />

              {/* 底部工具栏 */}
              <div className="absolute bottom-0 right-0 p-2 flex items-center justify-end">
                {/* 发送按钮 */}
                <button
                  className="p-2 text-gray-300 hover:text-white disabled:opacity-40"
                  onClick={handleSendMessage}
                  disabled={isLoading || !message.trim()}
                  title="发送消息"
                >
                  {isLoading ? (
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="text-xs text-center mt-2 text-gray-500">
            <span>按Enter键发送，Shift+Enter键换行</span>
          </div>
        </div>
      </div>
    </div>
  );
}

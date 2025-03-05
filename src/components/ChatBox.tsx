import React, { useState, useRef, useEffect } from "react";
import ChatMessage, { MessageRole } from "./ChatMessage";

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
}

interface ChatBoxProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isProcessing?: boolean;
  placeholder?: string;
}

export default function ChatBox({
  messages,
  onSendMessage,
  isProcessing = false,
  placeholder = "输入消息...",
}: ChatBoxProps) {
  const [inputValue, setInputValue] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // 当消息列表更新时，滚动到底部
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isProcessing) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full bg-base-200 rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center opacity-50">
            <div>
              <p className="text-lg">欢迎使用LLM聊天框</p>
              <p className="text-sm">发送消息开始聊天</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                role={message.role}
                timestamp={message.timestamp}
              />
            ))}
          </>
        )}
        {isProcessing && (
          <div className="flex space-x-2 py-2 justify-center">
            <div
              className="loading loading-dots loading-md"
              data-testid="loading-indicator"
            ></div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="p-4 border-t border-base-300">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <textarea
            ref={inputRef}
            className="flex-1 textarea textarea-bordered h-12 resize-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isProcessing}
            rows={1}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!inputValue.trim() || isProcessing}
          >
            发送
          </button>
        </form>
      </div>
    </div>
  );
}

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessageProps {
  content: string;
  role: MessageRole;
  timestamp?: Date;
}

export default function ChatMessage({
  content,
  role,
  timestamp = new Date(),
}: ChatMessageProps) {
  const bubbleClass =
    role === "user"
      ? "chat-bubble chat-bubble-primary text-primary-content"
      : role === "assistant"
      ? "chat-bubble chat-bubble-secondary text-secondary-content"
      : "chat-bubble chat-bubble-accent text-accent-content";

  const alignmentClass =
    role === "user" ? "chat-end" : role === "assistant" ? "chat-start" : "";

  const avatarContent =
    role === "user" ? "👤" : role === "assistant" ? "🤖" : "ℹ️";

  const formattedTime = timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`chat ${alignmentClass} my-2`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full bg-base-300 flex items-center justify-center">
          {avatarContent}
        </div>
      </div>
      <div className={`${bubbleClass} max-w-full md:max-w-[80%]`}>
        <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
      <div className="chat-footer opacity-50 text-xs">{formattedTime}</div>
    </div>
  );
}

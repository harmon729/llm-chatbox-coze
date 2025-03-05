import { render, screen } from "@testing-library/react";
import ChatMessage, { MessageRole } from "./ChatMessage";

// 模拟ReactMarkdown组件，因为它在测试环境中可能会有问题
jest.mock("react-markdown", () => {
  return ({ children }: { children: string }) => <div>{children}</div>;
});

jest.mock("remark-gfm", () => () => {});

describe("ChatMessage Component", () => {
  const mockTimestamp = new Date("2023-06-15T12:30:00");

  test.each([
    ["user", "Hello there", "chat-end", "chat-bubble-primary"],
    ["assistant", "Hi, how can I help?", "chat-start", "chat-bubble-secondary"],
    ["system", "System message", "", "chat-bubble-accent"],
  ])(
    "renders %s message correctly",
    (role, content, alignClass, bubbleClass) => {
      render(
        <ChatMessage
          role={role as MessageRole}
          content={content}
          timestamp={mockTimestamp}
        />
      );

      // 检查消息内容
      expect(screen.getByText(content)).toBeInTheDocument();

      // 检查对齐方式
      const chatContainer = screen.getByText(content).closest(".chat");
      if (alignClass) {
        expect(chatContainer).toHaveClass(alignClass);
      }

      // 检查气泡样式
      const bubbleContainer = screen.getByText(content).closest(".chat-bubble");
      expect(bubbleContainer).toHaveClass(bubbleClass);

      // 检查时间戳
      const formattedTime = mockTimestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      expect(screen.getByText(formattedTime)).toBeInTheDocument();
    }
  );
});

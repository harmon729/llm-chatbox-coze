import { render, screen, fireEvent } from "@testing-library/react";
import ChatBox, { Message } from "./ChatBox";

// 模拟ChatMessage组件
jest.mock("./ChatMessage", () => {
  return ({ content }: { content: string }) => <div>{content}</div>;
});

describe("ChatBox Component", () => {
  const mockMessages: Message[] = [
    {
      id: "1",
      content: "你好，这是一条测试消息",
      role: "user",
      timestamp: new Date("2023-06-15T10:30:00"),
    },
    {
      id: "2",
      content: "这是助手的回复",
      role: "assistant",
      timestamp: new Date("2023-06-15T10:31:00"),
    },
  ];

  const mockOnSendMessage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with messages", () => {
    render(
      <ChatBox messages={mockMessages} onSendMessage={mockOnSendMessage} />
    );

    expect(screen.getByText("你好，这是一条测试消息")).toBeInTheDocument();
    expect(screen.getByText("这是助手的回复")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("输入消息...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "发送" })).toBeInTheDocument();
  });

  it("renders welcome message when no messages", () => {
    render(<ChatBox messages={[]} onSendMessage={mockOnSendMessage} />);

    expect(screen.getByText("欢迎使用LLM聊天框")).toBeInTheDocument();
    expect(screen.getByText("发送消息开始聊天")).toBeInTheDocument();
  });

  it("handles input change", () => {
    render(
      <ChatBox messages={mockMessages} onSendMessage={mockOnSendMessage} />
    );

    const input = screen.getByPlaceholderText("输入消息...");
    fireEvent.change(input, { target: { value: "这是一条新消息" } });

    expect(input).toHaveValue("这是一条新消息");
  });

  it("calls onSendMessage when form is submitted", () => {
    render(
      <ChatBox messages={mockMessages} onSendMessage={mockOnSendMessage} />
    );

    const input = screen.getByPlaceholderText("输入消息...");
    const sendButton = screen.getByRole("button", { name: "发送" });

    fireEvent.change(input, { target: { value: "这是一条新消息" } });
    fireEvent.click(sendButton);

    expect(mockOnSendMessage).toHaveBeenCalledWith("这是一条新消息");
    expect(input).toHaveValue("");
  });

  it("calls onSendMessage when Enter is pressed", () => {
    render(
      <ChatBox messages={mockMessages} onSendMessage={mockOnSendMessage} />
    );

    const input = screen.getByPlaceholderText("输入消息...");

    fireEvent.change(input, { target: { value: "回车发送的消息" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockOnSendMessage).toHaveBeenCalledWith("回车发送的消息");
    expect(input).toHaveValue("");
  });

  it("doesn't call onSendMessage when Shift+Enter is pressed", () => {
    render(
      <ChatBox messages={mockMessages} onSendMessage={mockOnSendMessage} />
    );

    const input = screen.getByPlaceholderText("输入消息...");

    fireEvent.change(input, { target: { value: "不应该发送的消息" } });
    fireEvent.keyDown(input, { key: "Enter", shiftKey: true });

    expect(mockOnSendMessage).not.toHaveBeenCalled();
    expect(input).toHaveValue("不应该发送的消息");
  });

  it("shows loading indicator when processing", () => {
    render(
      <ChatBox
        messages={mockMessages}
        onSendMessage={mockOnSendMessage}
        isProcessing={true}
      />
    );

    expect(screen.getByText("发送").closest("button")).toBeDisabled();
    expect(screen.getByPlaceholderText("输入消息...")).toBeDisabled();
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
  });
});

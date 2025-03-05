import { render, screen, fireEvent } from "@testing-library/react";
import InlineBox from "./inlinebox";

// 模拟cozeService
jest.mock("../../services/cozeService", () => ({
  sendMessage: jest.fn().mockResolvedValue({
    text: "This is a mocked response",
    prompt_tokens: 10,
    completion_tokens: 10,
  }),
}));

describe("InlineBox Component", () => {
  beforeEach(() => {
    // 清除所有mock的调用记录
    jest.clearAllMocks();
  });

  it("renders the initial state correctly", () => {
    render(<InlineBox defaultPrompt="Hello" />);

    // 检查是否渲染了聊天框和输入框
    expect(screen.getByPlaceholderText("输入消息...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "发送" })).toBeInTheDocument();
  });

  it("displays the default prompt when provided", () => {
    render(<InlineBox defaultPrompt="测试默认提示" />);

    // 检查默认提示是否显示在输入框中
    expect(
      screen.getByPlaceholderText("输入消息...").getAttribute("value")
    ).toBe("测试默认提示");
  });

  it("handles input change correctly", () => {
    render(<InlineBox />);

    const inputElement = screen.getByPlaceholderText("输入消息...");
    fireEvent.change(inputElement, { target: { value: "新消息" } });

    // 检查输入值是否正确更新
    expect(inputElement.value).toBe("新消息");
  });

  it("disables the send button when input is empty", () => {
    render(<InlineBox />);

    // 检查发送按钮是否被禁用
    expect(screen.getByRole("button", { name: "发送" })).toBeDisabled();
  });

  it("enables the send button when input has content", () => {
    render(<InlineBox />);

    const inputElement = screen.getByPlaceholderText("输入消息...");
    fireEvent.change(inputElement, { target: { value: "新消息" } });

    // 检查发送按钮是否被启用
    expect(screen.getByRole("button", { name: "发送" })).not.toBeDisabled();
  });

  it("shows loading state when processing message", async () => {
    render(<InlineBox />);

    // 输入消息并发送
    const inputElement = screen.getByPlaceholderText("输入消息...");
    fireEvent.change(inputElement, { target: { value: "新消息" } });
    fireEvent.click(screen.getByRole("button", { name: "发送" }));

    // 检查是否显示加载状态
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
  });
});

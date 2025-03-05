import { render, screen, fireEvent } from "@testing-library/react";
import StandaloneBox from "./standalonebox";

// 模拟cozeService
jest.mock("../../services/cozeService", () => ({
  streamChat: jest.fn((message, onData, onComplete, onError) => {
    // 立即返回一些数据
    onData("模拟的响应");
    // 模拟完成
    setTimeout(() => onComplete("模拟的完整响应"), 100);
    return () => {}; // 返回取消函数
  }),
}));

describe("StandaloneBox Component", () => {
  beforeEach(() => {
    // 清除所有mock的调用记录
    jest.clearAllMocks();
  });

  it("renders the initial state correctly", () => {
    render(<StandaloneBox />);

    // 检查是否渲染了聊天框和输入框
    expect(screen.getByPlaceholderText("输入你的问题")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "发送" })).toBeInTheDocument();
  });

  it("handles input change correctly", () => {
    render(<StandaloneBox />);

    const inputElement = screen.getByPlaceholderText("输入你的问题");
    fireEvent.change(inputElement, { target: { value: "新消息" } });

    // 检查输入值是否正确更新
    expect(inputElement.value).toBe("新消息");
  });

  it("disables the send button when input is empty", () => {
    render(<StandaloneBox />);

    // 检查发送按钮是否被禁用
    expect(screen.getByRole("button", { name: "发送" })).toBeDisabled();
  });

  it("enables the send button when input has content", () => {
    render(<StandaloneBox />);

    const inputElement = screen.getByPlaceholderText("输入你的问题");
    fireEvent.change(inputElement, { target: { value: "新消息" } });

    // 检查发送按钮是否被启用
    expect(screen.getByRole("button", { name: "发送" })).not.toBeDisabled();
  });

  it("shows chat history section", () => {
    render(<StandaloneBox />);

    // 检查是否显示聊天历史部分
    expect(screen.getByText("聊天历史")).toBeInTheDocument();
  });

  it("shows the new chat button", () => {
    render(<StandaloneBox />);

    // 检查是否显示新聊天按钮
    expect(screen.getByText("新聊天")).toBeInTheDocument();
  });
});

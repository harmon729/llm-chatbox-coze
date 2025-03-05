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
  uploadFile: jest.fn().mockResolvedValue({ file_id: "mock-file-id" }),
  retrieveFile: jest.fn().mockResolvedValue({ url: "mock-file-url" }),
}));

// 模拟react-markdown
jest.mock("react-markdown", () => {
  return {
    __esModule: true,
    default: ({ children }) => <div data-testid="markdown">{children}</div>,
  };
});

// 模拟remark-gfm
jest.mock("remark-gfm", () => {
  return {
    __esModule: true,
    default: () => ({}),
  };
});

describe("StandaloneBox Component", () => {
  beforeEach(() => {
    // 清除所有mock的调用记录
    jest.clearAllMocks();
  });

  it("renders the initial state correctly", () => {
    render(<StandaloneBox />);

    // 检查是否渲染了聊天框和输入框
    expect(screen.getByPlaceholderText("发送消息...")).toBeInTheDocument();
    expect(screen.getByTitle("发送消息")).toBeInTheDocument();
    expect(
      screen.getByText("开始对话吧，AI回复将显示在这里")
    ).toBeInTheDocument();
  });

  it("handles input change correctly", () => {
    render(<StandaloneBox />);

    const inputElement = screen.getByPlaceholderText("发送消息...");
    fireEvent.change(inputElement, { target: { value: "新消息" } });

    // 检查输入值是否正确更新
    expect(inputElement.value).toBe("新消息");
  });

  it("disables the send button when input is empty", () => {
    render(<StandaloneBox />);

    // 检查发送按钮是否被禁用
    expect(screen.getByTitle("发送消息")).toBeDisabled();
  });

  it("enables the send button when input has content", () => {
    render(<StandaloneBox />);

    const inputElement = screen.getByPlaceholderText("发送消息...");
    fireEvent.change(inputElement, { target: { value: "新消息" } });

    // 检查发送按钮是否被启用
    expect(screen.getByTitle("发送消息")).not.toBeDisabled();
  });

  it("shows file upload button", () => {
    render(<StandaloneBox />);

    // 检查是否显示文件上传按钮
    expect(screen.getByTitle("上传文件")).toBeInTheDocument();
  });

  it("shows keyboard shortcut information", () => {
    render(<StandaloneBox />);

    // 检查是否显示键盘快捷键信息
    expect(
      screen.getByText("按Enter键发送，Shift+Enter键换行")
    ).toBeInTheDocument();
  });
});

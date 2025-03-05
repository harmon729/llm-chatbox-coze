import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import InlineBox from "./inlinebox";
import { streamChat } from "@/services/cozeService";

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

describe("InlineBox Component", () => {
  beforeEach(() => {
    // 清除所有mock的调用记录
    jest.clearAllMocks();
  });

  it("renders the initial state correctly", () => {
    render(<InlineBox />);

    // 检查是否渲染了搜索框
    expect(screen.getByPlaceholderText("搜索内容")).toBeInTheDocument();
    // 检查是否渲染了AI按钮
    expect(screen.getByText("询问AI")).toBeInTheDocument();
  });

  it("handles AI button click correctly", () => {
    render(<InlineBox />);

    // 点击AI按钮打开对话框
    fireEvent.click(screen.getByText("询问AI"));

    // 检查是否显示AI助手文本
    expect(screen.getByText("AI助手")).toBeInTheDocument();
    expect(
      screen.getByText("请输入您的问题，我将为您提供答案。")
    ).toBeInTheDocument();
  });

  it("handles search input change correctly", () => {
    render(<InlineBox />);

    // 找到搜索输入框并输入内容
    const searchInput = screen.getByPlaceholderText("搜索内容");
    fireEvent.change(searchInput, { target: { value: "搜索测试" } });

    // 检查输入值是否正确更新
    expect(searchInput.value).toBe("搜索测试");
  });

  it("shows AI response when sending a message", async () => {
    render(<InlineBox />);

    // 输入搜索内容
    const searchInput = screen.getByPlaceholderText("搜索内容");
    fireEvent.change(searchInput, { target: { value: "测试问题" } });

    // 点击询问AI按钮
    fireEvent.click(screen.getByText("询问AI"));

    // 等待AI响应
    await waitFor(() => {
      expect(screen.getByTestId("markdown")).toBeInTheDocument();
    });
  });

  it("calls streamChat when sending a message", async () => {
    render(<InlineBox />);

    // 输入搜索内容
    const searchInput = screen.getByPlaceholderText("搜索内容");
    fireEvent.change(searchInput, { target: { value: "测试问题" } });

    // 点击询问AI按钮
    fireEvent.click(screen.getByText("询问AI"));

    // 验证streamChat被调用
    expect(streamChat).toHaveBeenCalled();
  });
});

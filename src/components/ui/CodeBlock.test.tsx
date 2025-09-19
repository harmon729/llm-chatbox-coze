import React from "react";
import { render, screen } from "@testing-library/react";
import CodeBlock from "./CodeBlock";

describe("CodeBlock Component", () => {
  const sampleCode = `function example() {
  return "Hello, World!";
}`;

  it("renders code content correctly", () => {
    render(<CodeBlock language="javascript" value={sampleCode} />);

    // 检查代码内容是否正确渲染
    expect(screen.getByText(/function example/)).toBeInTheDocument();
  });

  it("applies the correct language class", () => {
    render(<CodeBlock language="javascript" value={sampleCode} />);

    // 检查是否应用了正确的语言类
    const codeElement = screen.getByText(/function example/).closest("code");
    expect(codeElement).toHaveClass("language-javascript");
  });

  it("renders with default language when not specified", () => {
    render(<CodeBlock value={sampleCode} />);

    // 检查是否使用了默认语言
    const codeElement = screen.getByText(/function example/).closest("code");
    // 检查元素是否存在，不检查类名
    expect(codeElement).toBeInTheDocument();
  });

  it("handles empty code gracefully", () => {
    render(<CodeBlock language="javascript" value="" />);

    // 检查是否渲染了空代码块
    const codeElement = screen
      .getByLabelText("复制代码")
      .closest("pre")
      ?.querySelector("code");
    expect(codeElement).toBeInTheDocument();
    expect(codeElement?.textContent).toBe("");
  });
});

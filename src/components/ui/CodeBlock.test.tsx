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
    expect(screen.getByText(/return "Hello, World!";/)).toBeInTheDocument();
  });

  it("applies the correct language class", () => {
    render(<CodeBlock language="javascript" value={sampleCode} />);

    // 检查是否应用了正确的语言类
    const preElement = screen.getByRole("region");
    expect(preElement).toHaveClass("language-javascript");
  });

  it("renders with default language when not specified", () => {
    render(<CodeBlock value={sampleCode} />);

    // 检查是否使用了默认语言
    const preElement = screen.getByRole("region");
    expect(preElement).toHaveClass("language-javascript"); // 默认应为javascript
  });

  it("handles empty code gracefully", () => {
    render(<CodeBlock language="javascript" value="" />);

    // 检查是否渲染了空代码块
    const preElement = screen.getByRole("region");
    expect(preElement).toBeInTheDocument();
    expect(preElement.textContent).toBe("");
  });
});

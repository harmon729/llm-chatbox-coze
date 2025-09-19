import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./navbar";

describe("Navbar Component", () => {
  it("renders correctly", () => {
    render(<Navbar />);
    expect(screen.getByText("LLM聊天框组件")).toBeInTheDocument();
  });

  it("calls onSearchClick when search button is clicked", () => {
    const mockOnSearchClick = jest.fn();
    render(<Navbar onSearchClick={mockOnSearchClick} />);

    // 找到搜索按钮并点击
    const searchButtons = screen.getAllByRole("button");
    const searchButton = searchButtons[searchButtons.length - 1]; // 假设搜索按钮是最后一个按钮
    fireEvent.click(searchButton);

    expect(mockOnSearchClick).toHaveBeenCalledTimes(1);
  });

  it("toggles theme when theme button is clicked", () => {
    const mockThemeToggle = jest.fn();
    render(<Navbar currentTheme="light" onThemeToggle={mockThemeToggle} />);

    // 找到主题切换按钮并点击
    const themeButtons = screen.getAllByRole("button");
    const themeButton = themeButtons[themeButtons.length - 2]; // 假设主题按钮是倒数第二个按钮
    fireEvent.click(themeButton);

    expect(mockThemeToggle).toHaveBeenCalledTimes(1);
  });
});

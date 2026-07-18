import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { formatBoldText, parseBoldText } from "./FormattedText";

describe("FormattedText", () => {
  it("parses paired bold markers and preserves surrounding text", () => {
    expect(parseBoldText("前文**需求分析**后文")).toEqual([
      { bold: false, value: "前文" },
      { bold: true, value: "需求分析" },
      { bold: false, value: "后文" },
    ]);
  });

  it("keeps unmatched markers as original text", () => {
    expect(parseBoldText("未完成**加粗")).toEqual([
      { bold: false, value: "未完成**" },
      { bold: false, value: "加粗" },
    ]);
  });

  it("renders HTML-looking input as text instead of executing it", () => {
    const { container } = render(<p>{formatBoldText("**重点**<script>危险</script>")}</p>);
    expect(screen.getByText("重点").tagName).toBe("STRONG");
    expect(container.querySelector("script")).not.toBeInTheDocument();
    expect(container).toHaveTextContent("<script>危险</script>");
  });
});

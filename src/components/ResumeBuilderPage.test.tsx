import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ResumeBuilderPage } from "./ResumeBuilderPage";

describe("ResumeBuilderPage", () => {
  it("adds, previews, saves and deletes an education item", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    render(<ResumeBuilderPage />);
    await waitFor(() => expect(screen.getByText("已自动保存")).toBeInTheDocument());

    fireEvent.click(screen.getByRole("button", { name: "添加教育背景" }));
    fireEvent.change(screen.getByLabelText("学校"), { target: { value: "测试大学" } });
    await waitFor(() => expect(screen.getByText("测试大学")).toBeInTheDocument());
    await waitFor(() => expect(window.localStorage.getItem("plaincv-resume-data")).toContain("测试大学"));

    fireEvent.click(screen.getByRole("button", { name: "删除这段教育背景" }));
    await waitFor(() => expect(screen.queryByLabelText("学校")).not.toBeInTheDocument());
    expect(window.confirm).toHaveBeenCalled();
  });

  it("calls the browser print function", async () => {
    const print = vi.spyOn(window, "print").mockImplementation(() => undefined);
    render(<ResumeBuilderPage />);
    await waitFor(() => expect(screen.getByText("已自动保存")).toBeInTheDocument());
    fireEvent.click(screen.getAllByRole("button", { name: "导出 PDF" })[0]);
    expect(print).toHaveBeenCalledOnce();
  });

  it("switches between editor and preview views", async () => {
    render(<ResumeBuilderPage />);
    await waitFor(() => expect(screen.getByText("已自动保存")).toBeInTheDocument());
    const editorButton = screen.getByRole("button", { name: "编辑" });
    const previewButton = screen.getByRole("button", { name: "预览" });
    expect(editorButton).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(previewButton);
    expect(previewButton).toHaveAttribute("aria-pressed", "true");
    expect(editorButton).toHaveAttribute("aria-pressed", "false");
  });

  it("adds and removes bold markers around selected internship text", async () => {
    render(<ResumeBuilderPage />);
    await waitFor(() => expect(screen.getByText("已自动保存")).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: "添加实习经历" }));
    const textarea = screen.getByLabelText("工作内容") as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "需求分析：整理业务需求" } });
    textarea.setSelectionRange(0, 4);
    fireEvent.click(screen.getByRole("button", { name: "加粗工作内容中选中的文字" }));
    await waitFor(() => expect(textarea).toHaveValue("**需求分析**：整理业务需求"));
    expect(screen.getByText("需求分析").tagName).toBe("STRONG");

    textarea.setSelectionRange(2, 6);
    fireEvent.click(screen.getByRole("button", { name: "加粗工作内容中选中的文字" }));
    await waitFor(() => expect(textarea).toHaveValue("需求分析：整理业务需求"));
  });
});

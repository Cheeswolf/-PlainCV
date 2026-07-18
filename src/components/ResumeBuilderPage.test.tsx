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
});

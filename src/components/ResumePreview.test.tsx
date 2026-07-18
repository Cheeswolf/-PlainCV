import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ResumeData } from "@/types/resumeTypes";
import { ResumePreview } from "./ResumePreview";

const populatedData: ResumeData = {
  personalInfo: { name: "张三", phone: "13800000000", email: "zhang@example.com" },
  education: [{ id: "e1", school: "示例大学", major: "计算机", degree: "本科", startDate: "2020.09", endDate: "2024.06", courses: "", gpaOrRanking: "" }],
  internships: [{ id: "i1", company: "示例公司", role: "实习生", startDate: "2023.01", endDate: "2023.06", content: "第一行\n第二行" }],
  projects: [{ id: "p1", name: "示例项目", projectRole: "", startDate: "", endDate: "", description: "项目描述" }],
  advantages: "优势一\n优势二",
};

describe("ResumePreview", () => {
  it("renders modules in the fixed order and keeps user newlines", () => {
    const { container } = render(<ResumePreview data={populatedData} />);
    const text = container.textContent ?? "";
    expect(text.indexOf("教育背景")).toBeLessThan(text.indexOf("实习经历"));
    expect(text.indexOf("实习经历")).toBeLessThan(text.indexOf("项目经历"));
    expect(text.indexOf("项目经历")).toBeLessThan(text.indexOf("个人优势"));
    expect([...container.querySelectorAll("p")].some((element) => element.textContent === "第一行\n第二行")).toBe(true);
  });

  it("hides empty optional fields without stray separators", () => {
    render(<ResumePreview data={populatedData} />);
    expect(screen.queryByText(/项目角色：/)).not.toBeInTheDocument();
    expect(screen.getByText("示例项目").parentElement).not.toHaveTextContent("—");
  });

  it("hides empty modules", () => {
    const emptyData: ResumeData = { personalInfo: { name: "", phone: "仅手机号", email: "" }, education: [], internships: [], projects: [], advantages: "" };
    render(<ResumePreview data={emptyData} />);
    expect(screen.getByText("仅手机号")).toBeInTheDocument();
    expect(screen.queryByText("教育背景")).not.toBeInTheDocument();
    expect(screen.queryByText(/｜/)).not.toBeInTheDocument();
  });
});

import { describe, expect, it } from "vitest";
import { aiPrompts } from "./aiPrompts";

describe("aiPrompts", () => {
  it("contains exactly the three required categories", () => {
    expect(aiPrompts.map((prompt) => prompt.id)).toEqual(["internship", "project", "advantages"]);
  });

  it("places all required truthfulness reminders in every prompt", () => {
    for (const prompt of aiPrompts) {
      expect(prompt.content).toContain("只使用我提供的真实信息");
      expect(prompt.content).toContain("不得虚构");
      expect(prompt.content).toContain("最终内容由我自行判断、核实和修改");
    }
  });

  it("applies the supplied writing standards to each prompt type", () => {
    expect(aiPrompts.find((prompt) => prompt.id === "internship")?.content).toContain("真实公司、机构或正式团队");
    expect(aiPrompts.find((prompt) => prompt.id === "project")?.content).toContain("课程设计、竞赛、社团任务、个人实践");
    expect(aiPrompts.find((prompt) => prompt.id === "advantages")?.content).toContain("积极乐观");
  });

  it("requires four-character headings, STAR structure and truthful metrics for experience prompts", () => {
    for (const id of ["internship", "project"] as const) {
      const content = aiPrompts.find((prompt) => prompt.id === id)?.content ?? "";
      expect(content).toContain("3—5条");
      expect(content).toContain("加粗的四字标题");
      expect(content).toContain("STAR逻辑");
      expect(content).toContain("动作＋对象＋方法＋结果");
      expect(content).toContain("输出前自检");
      expect(content).toContain("真实数据");
    }
  });
});

import { describe, expect, it } from "vitest";
import { aiPrompts } from "./aiPrompts";

describe("aiPrompts", () => {
  it("contains exactly the four required categories", () => {
    expect(aiPrompts.map((prompt) => prompt.id)).toEqual(["internship", "project", "advantages"]);
  });

  it("places all required truthfulness reminders in every prompt", () => {
    for (const prompt of aiPrompts) {
      expect(prompt.content).toContain("只使用我提供的真实信息");
      expect(prompt.content).toContain("不得虚构数字");
      expect(prompt.content).toContain("不把“参与”改写成“主导”");
      expect(prompt.content).toContain("不把“了解”改写成“熟练”");
      expect(prompt.content).toContain("最终内容由我自行判断、核实和修改");
    }
  });

  it("applies the supplied writing standards to each prompt type", () => {
    expect(aiPrompts.find((prompt) => prompt.id === "internship")?.content).toContain("公司中实际完成的工作");
    expect(aiPrompts.find((prompt) => prompt.id === "project")?.content).toContain("课程设计、竞赛、社团任务、个人实践");
    expect(aiPrompts.find((prompt) => prompt.id === "advantages")?.content).toContain("积极乐观");
  });

  it("requires four-character headings, STAR structure and truthful metrics for experience prompts", () => {
    for (const id of ["internship", "project"] as const) {
      const content = aiPrompts.find((prompt) => prompt.id === id)?.content ?? "";
      expect(content).toContain("3—5条");
      expect(content).toContain("**四字概括**");
      expect(content).toContain("STAR法则");
      expect(content).toContain("四个环节都不能缺失");
      expect(content).toContain("每个环节分别用1—2个高度概括的短句");
      expect(content).toContain("以1句为主");
      expect(content).toContain("按顺序合并为一段连贯的工作描述");
      expect(content).toContain("真实数据");
    }
  });
});

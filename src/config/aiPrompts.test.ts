import { describe, expect, it } from "vitest";
import { aiPrompts } from "./aiPrompts";

describe("aiPrompts", () => {
  it("contains exactly the four required categories", () => {
    expect(aiPrompts.map((prompt) => prompt.id)).toEqual(["internship", "project", "jd", "advantages"]);
  });

  it("places all required truthfulness reminders in every prompt", () => {
    for (const prompt of aiPrompts) {
      expect(prompt.content).toContain("只使用我提供的真实信息");
      expect(prompt.content).toContain("不编造任何量化结果");
      expect(prompt.content).toContain("不把“参与”改写成“主导”");
      expect(prompt.content).toContain("不把“了解”改写成“熟练”");
      expect(prompt.content).toContain("最终内容由我自行判断、核实和修改");
    }
  });
});

import { describe, expect, it } from "vitest";
import { defaultResumeData } from "@/data/defaultResumeData";
import { resumeDataSchema } from "./resumeTypes";

describe("resumeDataSchema", () => {
  it("accepts the default empty resume", () => {
    expect(resumeDataSchema.safeParse(defaultResumeData).success).toBe(true);
  });

  it("rejects damaged local data structures", () => {
    expect(resumeDataSchema.safeParse({ personalInfo: null }).success).toBe(false);
  });

  it("does not impose content length or format limits", () => {
    const data = { ...defaultResumeData, personalInfo: { name: "任意内容".repeat(1000), phone: "不是固定格式", email: "自由填写" } };
    expect(resumeDataSchema.safeParse(data).success).toBe(true);
  });
});

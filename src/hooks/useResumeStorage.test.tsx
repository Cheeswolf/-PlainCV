import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { defaultResumeData } from "@/data/defaultResumeData";
import { useResumeStorage } from "./useResumeStorage";

const storageKey = "plaincv-resume-data";

describe("useResumeStorage", () => {
  it("falls back safely when localStorage is damaged", async () => {
    window.localStorage.setItem(storageKey, "{damaged");
    const { result } = renderHook(() => useResumeStorage());
    await waitFor(() => expect(result.current.isLoaded).toBe(true));
    expect(result.current.data).toEqual(defaultResumeData);
  });

  it("restores valid data and automatically saves changes", async () => {
    const saved = { ...defaultResumeData, personalInfo: { name: "已保存", phone: "", email: "" } };
    window.localStorage.setItem(storageKey, JSON.stringify(saved));
    const { result } = renderHook(() => useResumeStorage());
    await waitFor(() => expect(result.current.data.personalInfo.name).toBe("已保存"));
    act(() => result.current.setData({ ...saved, advantages: "新内容" }));
    await waitFor(() => expect(JSON.parse(window.localStorage.getItem(storageKey) ?? "{}").advantages).toBe("新内容"));
  });

  it("clears data and removes the storage entry", async () => {
    window.localStorage.setItem(storageKey, JSON.stringify({ ...defaultResumeData, advantages: "内容" }));
    const { result } = renderHook(() => useResumeStorage());
    await waitFor(() => expect(result.current.isLoaded).toBe(true));
    act(() => result.current.clearData());
    expect(result.current.data).toEqual(defaultResumeData);
    expect(window.localStorage.getItem(storageKey)).toBeNull();
  });
});

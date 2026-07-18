"use client";

import { useCallback, useState } from "react";
import { useResumeStorage } from "@/hooks/useResumeStorage";
import type { ResumeData } from "@/types/resumeTypes";
import { Header } from "./Header";
import { AiPromptSection } from "./AiPromptSection";
import { PrintButton } from "./PrintButton";
import { ResumeEditor } from "./ResumeEditor";
import { ResumePreview } from "./ResumePreview";
import styles from "./ResumeBuilderPage.module.css";

export function ResumeBuilderPage() {
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");
  const { data, setData, clearData, isLoaded } = useResumeStorage();
  const updateData = useCallback((next: ResumeData) => setData(next), [setData]);
  const handleClear = () => {
    if (window.confirm("确定要清空当前填写的简历内容吗？")) clearData();
  };

  return (
    <>
      <Header onClear={handleClear} isLoaded={isLoaded} />
      <main className={styles.main}>
        <div className={`${styles.mobileViewSwitch} noPrint`} role="group" aria-label="移动端视图切换">
          <button type="button" className={mobileView === "editor" ? styles.activeViewButton : ""} aria-pressed={mobileView === "editor"} onClick={() => setMobileView("editor")}>编辑</button>
          <button type="button" className={mobileView === "preview" ? styles.activeViewButton : ""} aria-pressed={mobileView === "preview"} onClick={() => setMobileView("preview")}>预览</button>
        </div>
        <div className={styles.workspace}>
          <div id="editor-view" className={`${styles.editorColumn} ${mobileView === "preview" ? styles.mobileHidden : ""}`}>
            <ResumeEditor data={data} onChange={updateData} />
            <AiPromptSection />
          </div>
          <div id="preview-view" className={`${styles.previewColumn} ${mobileView === "editor" ? styles.mobileHidden : ""}`}>
            <ResumePreview data={data} />
          </div>
        </div>
        <div className={`${styles.bottomAction} noPrint`}><PrintButton className={styles.printButton} /></div>
      </main>
    </>
  );
}

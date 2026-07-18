"use client";

import { useCallback } from "react";
import { useResumeStorage } from "@/hooks/useResumeStorage";
import type { ResumeData } from "@/types/resumeTypes";
import { Header } from "./Header";
import { AiPromptSection } from "./AiPromptSection";
import { PrintButton } from "./PrintButton";
import { ResumeEditor } from "./ResumeEditor";
import { ResumePreview } from "./ResumePreview";
import styles from "./ResumeBuilderPage.module.css";

export function ResumeBuilderPage() {
  const { data, setData, clearData, isLoaded } = useResumeStorage();
  const updateData = useCallback((next: ResumeData) => setData(next), [setData]);
  const handleClear = () => {
    if (window.confirm("确定要清空当前填写的简历内容吗？")) clearData();
  };

  return (
    <>
      <Header onClear={handleClear} isLoaded={isLoaded} />
      <main className={styles.main}>
        <ResumeEditor data={data} onChange={updateData} />
        <AiPromptSection />
        <ResumePreview data={data} />
        <div className={`${styles.bottomAction} noPrint`}><PrintButton className={styles.printButton} /></div>
      </main>
    </>
  );
}

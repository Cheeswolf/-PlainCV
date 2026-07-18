"use client";

import { useState } from "react";
import { aiPrompts, type AiPrompt } from "@/config/aiPrompts";
import styles from "./AiPromptSection.module.css";

export function AiPromptSection() {
  const [copiedId, setCopiedId] = useState<AiPrompt["id"] | null>(null);

  const copyPrompt = async (prompt: AiPrompt) => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopiedId(prompt.id);
      window.setTimeout(() => setCopiedId((current) => current === prompt.id ? null : current), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  return <section className={`${styles.section} noPrint`} aria-labelledby="ai-prompts-title">
    <div className={styles.intro}>
      <h2 id="ai-prompts-title">AI辅助提示词</h2>
      <p>查看并复制提示词，然后前往你选择的大模型平台使用。本站不会读取或提交你的简历内容。</p>
    </div>
    <div className={styles.list}>
      {aiPrompts.map((prompt) => <details className={styles.item} key={prompt.id}>
        <summary><span>{prompt.title}</span><span className={styles.viewText}>查看提示词</span></summary>
        <div className={styles.content}>
          <p className={styles.description}>{prompt.description}</p>
          <pre>{prompt.content}</pre>
          <div className={styles.copyRow}>
            <button type="button" onClick={() => void copyPrompt(prompt)}>一键复制</button>
            <span role="status" aria-live="polite">{copiedId === prompt.id ? "复制成功" : ""}</span>
          </div>
        </div>
      </details>)}
    </div>
  </section>;
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { publicSupportConfigSchema } from "@/types/supportTypes";
import type { PublicSupportConfig } from "@/types/supportTypes";
import styles from "./SupportButton.module.css";

interface SupportButtonProps { className?: string; }

export function SupportButton({ className }: SupportButtonProps) {
  const [config, setConfig] = useState<PublicSupportConfig | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadConfig() {
      try {
        const response = await fetch("/api/support", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) return;

        const parsed = publicSupportConfigSchema.safeParse(await response.json());
        if (parsed.success && parsed.data.enabled) setConfig(parsed.data);
      } catch {
        // 可选功能配置不可用时保持隐藏，不影响简历编辑。
      }
    }

    void loadConfig();
    return () => controller.abort();
  }, []);

  if (!config) return null;

  const openDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  };

  const closeDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  };

  return (
    <>
      <button type="button" className={className} onClick={openDialog}>支持作者</button>
      <dialog
        ref={dialogRef}
        className={`${styles.dialog} noPrint`}
        aria-labelledby="support-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        <div className={styles.panel}>
          <div className={styles.heading}>
            <div>
              <h2 id="support-dialog-title">支持白简历</h2>
              <p>如果它帮你节省了时间，可以自愿支持作者继续维护。</p>
            </div>
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeDialog}
              aria-label="关闭支持作者弹窗"
            >关闭</button>
          </div>
          <div className={styles.channels}>
            {config.channels.map((channel) => (
              <section className={styles.channel} key={channel.id}>
                <h3>{channel.label}</h3>
                <Image
                  className={styles.qrCode}
                  src={channel.qrUrl}
                  alt={`${channel.label}支持作者二维码`}
                  width={240}
                  height={240}
                  unoptimized
                />
                <p>{channel.recipientHint}</p>
              </section>
            ))}
          </div>
          <p className={styles.notice}>
            请在付款前核对收款人信息。无论是否支持，白简历的全部功能均可免费使用。
          </p>
        </div>
      </dialog>
    </>
  );
}

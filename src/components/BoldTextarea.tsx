import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import type { ResumeData } from "@/types/resumeTypes";
import styles from "./BoldTextarea.module.css";

type BoldFieldName = `internships.${number}.content` | `projects.${number}.description`;

interface BoldTextareaProps {
  id: string;
  label: string;
  name: BoldFieldName;
}

export function BoldTextarea({ id, label, name }: BoldTextareaProps) {
  const { getValues, register, setValue } = useFormContext<ResumeData>();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const registration = register(name);

  const toggleBold = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start === end) {
      textarea.focus();
      return;
    }

    const value = getValues(name);
    const selected = value.slice(start, end);
    let nextValue: string;
    let nextStart: number;
    let nextEnd: number;

    if (selected.startsWith("**") && selected.endsWith("**") && selected.length > 4) {
      const unwrapped = selected.slice(2, -2);
      nextValue = `${value.slice(0, start)}${unwrapped}${value.slice(end)}`;
      nextStart = start;
      nextEnd = start + unwrapped.length;
    } else if (start >= 2 && value.slice(start - 2, start) === "**" && value.slice(end, end + 2) === "**") {
      nextValue = `${value.slice(0, start - 2)}${selected}${value.slice(end + 2)}`;
      nextStart = start - 2;
      nextEnd = end - 2;
    } else {
      nextValue = `${value.slice(0, start)}**${selected}**${value.slice(end)}`;
      nextStart = start + 2;
      nextEnd = end + 2;
    }

    setValue(name, nextValue, { shouldDirty: true, shouldTouch: true });
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(nextStart, nextEnd);
    });
  };

  return <div className="formField formFieldFull">
    <div className={styles.labelRow}>
      <label htmlFor={id}>{label}</label>
      <button type="button" className={styles.boldButton} onClick={toggleBold} aria-label={`加粗${label}中选中的文字`}><strong>B</strong> 加粗</button>
    </div>
    <textarea
      id={id}
      {...registration}
      ref={(element) => {
        registration.ref(element);
        textareaRef.current = element;
      }}
    />
    <span className={styles.hint}>选中文字后点击加粗；未选择文字时不会修改内容。</span>
  </div>;
}

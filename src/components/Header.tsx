import { PrintButton } from "./PrintButton";
import { SupportButton } from "./SupportButton";
import styles from "./Header.module.css";

interface HeaderProps { onClear: () => void; isLoaded: boolean; }

export function Header({ onClear, isLoaded }: HeaderProps) {
  return (
    <header className={`${styles.header} noPrint`}>
      <div className={styles.inner}>
        <strong className={styles.brand}>白简历 PlainCV</strong>
        <div className={styles.actions}>
          <span className={styles.status} aria-live="polite">{isLoaded ? "已自动保存" : "正在加载"}</span>
          <SupportButton className={styles.secondary} />
          <button type="button" className={styles.secondary} onClick={onClear}>清空内容</button>
          <PrintButton className={styles.primary} />
        </div>
      </div>
    </header>
  );
}

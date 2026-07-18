import type { ResumeData } from "@/types/resumeTypes";
import { formatBoldText } from "./FormattedText";
import styles from "./ResumePreview.module.css";

interface ResumePreviewProps { data: ResumeData; }

export function ResumePreview({ data }: ResumePreviewProps) {
  const contacts = [data.personalInfo.phone, data.personalInfo.email].filter(Boolean);
  const education = data.education.filter((item) => [item.school, item.major, item.degree, item.startDate, item.endDate, item.courses, item.gpaOrRanking].some(Boolean));
  const internships = data.internships.filter((item) => [item.company, item.role, item.startDate, item.endDate, item.content].some(Boolean));
  const projects = data.projects.filter((item) => [item.name, item.projectRole, item.startDate, item.endDate, item.description].some(Boolean));
  const dateRange = (start: string | undefined, end: string | undefined) => [start, end].filter(Boolean).join("—");

  return (
    <section className={`${styles.previewSection} printArea`} aria-label="简历预览">
      <article className={styles.resumePage}>
        {(data.personalInfo.name || contacts.length > 0) && <header className={styles.personalInfo}>
          {data.personalInfo.name && <h1>{data.personalInfo.name}</h1>}
          {contacts.length > 0 && <p>{contacts.join(" ｜ ")}</p>}
        </header>}

        {education.length > 0 && <section className={styles.resumeSection}>
          <h2>教育背景</h2>
          {education.map((item) => <div className={`${styles.entry} ${styles.keepTogether}`} key={item.id}>
            <div className={styles.entryHeading}><strong>{item.school}</strong>{dateRange(item.startDate, item.endDate) && <span>{dateRange(item.startDate, item.endDate)}</span>}</div>
            {[item.major, item.degree].some(Boolean) && <p>{[item.major, item.degree].filter(Boolean).join("｜")}</p>}
            {item.courses && <p>主修课程：{item.courses}</p>}
            {item.gpaOrRanking && <p>GPA或专业排名：{item.gpaOrRanking}</p>}
          </div>)}
        </section>}

        {internships.length > 0 && <section className={styles.resumeSection}>
          <h2>实习经历</h2>
          {internships.map((item) => <div className={styles.entry} key={item.id}>
            <div className={styles.entryHeading}><strong>{item.company}</strong>{dateRange(item.startDate, item.endDate) && <span>{dateRange(item.startDate, item.endDate)}</span>}</div>
            {item.role && <p className={styles.subtitle}>{item.role}</p>}
            {item.content && <p className={styles.multiline}>{formatBoldText(item.content)}</p>}
          </div>)}
        </section>}

        {projects.length > 0 && <section className={styles.resumeSection}>
          <h2>项目经历</h2>
          {projects.map((item) => <div className={styles.entry} key={item.id}>
            <div className={styles.entryHeading}><strong>{item.name}</strong>{dateRange(item.startDate, item.endDate) && <span>{dateRange(item.startDate, item.endDate)}</span>}</div>
            {item.projectRole && <p className={styles.subtitle}>项目角色：{item.projectRole}</p>}
            {item.description && <p className={styles.multiline}>{formatBoldText(item.description)}</p>}
          </div>)}
        </section>}

        {data.advantages && <section className={styles.resumeSection}>
          <h2>个人优势</h2>
          <p className={styles.multiline}>{data.advantages}</p>
        </section>}
      </article>
    </section>
  );
}

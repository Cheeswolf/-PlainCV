import { useFormContext } from "react-hook-form";
import type { ResumeData } from "@/types/resumeTypes";
import styles from "./PersonalInfoForm.module.css";

export function PersonalInfoForm() {
  const { register } = useFormContext<ResumeData>();

  return (
    <section className="formSection" aria-labelledby="personal-info-title">
      <h2 id="personal-info-title">个人信息</h2>
      <div className={styles.fields}>
        <div><label htmlFor="name">姓名</label><input id="name" type="text" {...register("personalInfo.name")} /></div>
        <div><label htmlFor="phone">手机号</label><input id="phone" type="text" {...register("personalInfo.phone")} /></div>
        <div><label htmlFor="email">邮箱</label><input id="email" type="text" {...register("personalInfo.email")} /></div>
      </div>
    </section>
  );
}

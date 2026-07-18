import { useFormContext } from "react-hook-form";
import type { ResumeData } from "@/types/resumeTypes";

export function AdvantagesForm() {
  const { register } = useFormContext<ResumeData>();
  return <section className="formSection" aria-labelledby="advantages-title">
    <h2 id="advantages-title">个人优势</h2>
    <div className="formField"><label htmlFor="advantages">个人优势</label><textarea id="advantages" {...register("advantages")} /></div>
  </section>;
}

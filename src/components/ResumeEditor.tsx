import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { resumeDataSchema, type ResumeData } from "@/types/resumeTypes";
import { AdvantagesForm } from "./AdvantagesForm";
import { EducationForm } from "./EducationForm";
import { InternshipForm } from "./InternshipForm";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ProjectForm } from "./ProjectForm";
import styles from "./ResumeEditor.module.css";

interface ResumeEditorProps { data: ResumeData; onChange: (data: ResumeData) => void; }

export function ResumeEditor({ data, onChange }: ResumeEditorProps) {
  const methods = useForm<ResumeData>({ resolver: zodResolver(resumeDataSchema), defaultValues: data });
  const latestExternalData = useRef(data);

  useEffect(() => {
    if (JSON.stringify(latestExternalData.current) !== JSON.stringify(data)) methods.reset(data);
    latestExternalData.current = data;
  }, [data, methods]);

  useEffect(() => {
    const unsubscribe = methods.subscribe({
      formState: { values: true },
      callback: ({ values }) => {
      const parsed = resumeDataSchema.safeParse(values);
      if (parsed.success && JSON.stringify(parsed.data) !== JSON.stringify(latestExternalData.current)) {
        latestExternalData.current = parsed.data;
        onChange(parsed.data);
      }
    }});
    return unsubscribe;
  }, [methods, onChange]);

  return (
    <section className={`${styles.editorArea} noPrint`} aria-label="简历内容填写区域">
      <FormProvider {...methods}>
        <form onSubmit={(event) => event.preventDefault()}>
          <PersonalInfoForm />
          <EducationForm />
          <InternshipForm />
          <ProjectForm />
          <AdvantagesForm />
        </form>
      </FormProvider>
    </section>
  );
}

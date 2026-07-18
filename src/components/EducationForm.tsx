import { useFieldArray, useFormContext } from "react-hook-form";
import type { ResumeData } from "@/types/resumeTypes";

export function EducationForm() {
  const { control, register } = useFormContext<ResumeData>();
  const { fields, append, remove } = useFieldArray({ control, name: "education", keyName: "_key" });
  const addItem = () => append({ id: crypto.randomUUID(), school: "", major: "", degree: "", startDate: "", endDate: "", courses: "", gpaOrRanking: "" });
  const deleteItem = (index: number) => { if (window.confirm("确定删除这段教育背景吗？")) remove(index); };

  return <section className="formSection" aria-labelledby="education-title">
    <h2 id="education-title">教育背景</h2>
    {fields.map((field, index) => <div className="repeatedItem" key={field._key}>
      <div className="formGrid">
        <div className="formField"><label htmlFor={`education-${index}-school`}>学校</label><input id={`education-${index}-school`} {...register(`education.${index}.school`)} /></div>
        <div className="formField"><label htmlFor={`education-${index}-major`}>专业</label><input id={`education-${index}-major`} {...register(`education.${index}.major`)} /></div>
        <div className="formField"><label htmlFor={`education-${index}-degree`}>学历</label><input id={`education-${index}-degree`} {...register(`education.${index}.degree`)} /></div>
        <div className="formField"><label htmlFor={`education-${index}-start`}>入学时间</label><input id={`education-${index}-start`} {...register(`education.${index}.startDate`)} /></div>
        <div className="formField"><label htmlFor={`education-${index}-end`}>毕业时间</label><input id={`education-${index}-end`} {...register(`education.${index}.endDate`)} /></div>
        <div className="formField"><label htmlFor={`education-${index}-courses`}>主修课程（选填）</label><input id={`education-${index}-courses`} {...register(`education.${index}.courses`)} /></div>
        <div className="formField formFieldFull"><label htmlFor={`education-${index}-gpa`}>GPA或专业排名（选填）</label><input id={`education-${index}-gpa`} {...register(`education.${index}.gpaOrRanking`)} /></div>
      </div><div className="itemActions"><button className="deleteButton" type="button" onClick={() => deleteItem(index)}>删除这段教育背景</button></div>
    </div>)}
    <div className="sectionActions"><button className="addButton" type="button" onClick={addItem}>添加教育背景</button></div>
  </section>;
}

import { useFieldArray, useFormContext } from "react-hook-form";
import type { ResumeData } from "@/types/resumeTypes";
import { BoldTextarea } from "./BoldTextarea";

export function InternshipForm() {
  const { control, register } = useFormContext<ResumeData>();
  const { fields, append, remove } = useFieldArray({ control, name: "internships", keyName: "_key" });
  const addItem = () => append({ id: crypto.randomUUID(), company: "", role: "", startDate: "", endDate: "", content: "" });
  const deleteItem = (index: number) => { if (window.confirm("确定删除这段实习经历吗？")) remove(index); };
  return <section className="formSection" aria-labelledby="internships-title">
    <h2 id="internships-title">实习经历</h2>
    {fields.map((field, index) => <div className="repeatedItem" key={field._key}><div className="formGrid">
      <div className="formField"><label htmlFor={`internship-${index}-company`}>公司名称</label><input id={`internship-${index}-company`} {...register(`internships.${index}.company`)} /></div>
      <div className="formField"><label htmlFor={`internship-${index}-role`}>岗位名称</label><input id={`internship-${index}-role`} {...register(`internships.${index}.role`)} /></div>
      <div className="formField"><label htmlFor={`internship-${index}-start`}>开始时间</label><input id={`internship-${index}-start`} {...register(`internships.${index}.startDate`)} /></div>
      <div className="formField"><label htmlFor={`internship-${index}-end`}>结束时间</label><input id={`internship-${index}-end`} {...register(`internships.${index}.endDate`)} /></div>
      <BoldTextarea id={`internship-${index}-content`} label="工作内容" name={`internships.${index}.content`} />
    </div><div className="itemActions"><button className="deleteButton" type="button" onClick={() => deleteItem(index)}>删除这段实习经历</button></div></div>)}
    <div className="sectionActions"><button className="addButton" type="button" onClick={addItem}>添加实习经历</button></div>
  </section>;
}

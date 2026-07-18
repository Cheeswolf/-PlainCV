import { useFieldArray, useFormContext } from "react-hook-form";
import type { ResumeData } from "@/types/resumeTypes";

export function ProjectForm() {
  const { control, register } = useFormContext<ResumeData>();
  const { fields, append, remove } = useFieldArray({ control, name: "projects", keyName: "_key" });
  const addItem = () => append({ id: crypto.randomUUID(), name: "", projectRole: "", startDate: "", endDate: "", description: "" });
  const deleteItem = (index: number) => { if (window.confirm("确定删除这个项目吗？")) remove(index); };
  return <section className="formSection" aria-labelledby="projects-title">
    <h2 id="projects-title">项目经历</h2>
    {fields.map((field, index) => <div className="repeatedItem" key={field._key}><div className="formGrid">
      <div className="formField"><label htmlFor={`project-${index}-name`}>项目名称</label><input id={`project-${index}-name`} {...register(`projects.${index}.name`)} /></div>
      <div className="formField"><label htmlFor={`project-${index}-role`}>项目角色（选填）</label><input id={`project-${index}-role`} {...register(`projects.${index}.projectRole`)} /></div>
      <div className="formField"><label htmlFor={`project-${index}-start`}>开始时间（选填）</label><input id={`project-${index}-start`} {...register(`projects.${index}.startDate`)} /></div>
      <div className="formField"><label htmlFor={`project-${index}-end`}>结束时间（选填）</label><input id={`project-${index}-end`} {...register(`projects.${index}.endDate`)} /></div>
      <div className="formField formFieldFull"><label htmlFor={`project-${index}-description`}>项目描述</label><textarea id={`project-${index}-description`} {...register(`projects.${index}.description`)} /></div>
    </div><div className="itemActions"><button className="deleteButton" type="button" onClick={() => deleteItem(index)}>删除这个项目</button></div></div>)}
    <div className="sectionActions"><button className="addButton" type="button" onClick={addItem}>添加项目经历</button></div>
  </section>;
}

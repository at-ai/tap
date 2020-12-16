import { GroupMarks, StudentMarks } from "../../domain";
import * as XLSX from "xlsx";

export const exportToXLSX = (marks: GroupMarks) => {
  const parsedMarks = Object.keys(marks).reduce((parsed, group) => {
    const data = marks[group];
    const parsedData = data.map((item) =>
      Object.keys(item).reduce((p, k) => {
        if (item[k].mark) return { ...p, [k]: { t: "s", v: item[k].mark } };
        else return { ...p, [k]: item[k] };
      }, {})
    );
    return { ...parsed, [group]: parsedData };
  }, {});
  const wb = XLSX.utils.book_new();
  Object.keys(parsedMarks).forEach((group) => {
    const sheet = XLSX.utils.json_to_sheet<StudentMarks>(parsedMarks[group]);
    XLSX.utils.book_append_sheet(wb, sheet, group);
  });
  XLSX.writeFile(wb, "marks.xlsx");
};

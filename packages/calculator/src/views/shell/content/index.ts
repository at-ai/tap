import { customElement, html, LitElement, TemplateResult } from "lit-element";
import * as XLSX from "xlsx";
import { calculate } from "../../../calculator";
import { moduleName } from "../../../constants";

@customElement(`${moduleName}-shell-content`)
export class Calculator extends LitElement {
  render(): TemplateResult {
    return html`<label for="grades">Choose a profile picture:</label>
      <input
        type="file"
        id="grades"
        name="grades"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        @change=${this.fileLoaded.bind(this)}
      />`;
  }

  private headers = ["Nom", "Primer Cognom", "Segon Cognom"];

  private fileLoaded(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      const result = event.target.result;
      const workbook = XLSX.read(result, { type: "binary" });
      workbook.SheetNames.forEach((sheet) => {
        const rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        const mappedStudents = rowObject.map((r) =>
          Object.keys(r).reduce((mapped: any, k) => {
            if (this.headers.indexOf(k) > -1) return { ...mapped, [k]: r[k] };
            else
              return {
                ...mapped,
                criteria: { ...(mapped.criteria || {}), [k]: r[k] },
              };
          }, {})
        );

        const studentMarks = mappedStudents.map((s) => ({
          name: s["Nom"],
          firstSurname: s["Primer Cognom"],
          secondSurname: s["Segon Cognom"],
          // marks: calculate(s),
          ...calculate(s),
        }));
      });
    });
    reader.readAsBinaryString(file);
  }
}

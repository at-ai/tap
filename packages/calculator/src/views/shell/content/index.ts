import {
  css,
  CSSResult,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
  unsafeCSS,
} from "lit-element";
import * as XLSX from "xlsx";
import { calculate } from "../../../calculator";
import { moduleName } from "../../../constants";
import { propertiesObserver } from "@uxland/uxl-utilities";
import { locale } from "@uxland/uxl-prism";
import { render, nothing } from "lit-html";
import "../../../components/grid";
import { repeat } from "lit-html/directives/repeat";
import { StudentMarks } from "../../../domain";
import styles from "./styles.scss";

@customElement(`${moduleName}-shell-content`)
export class Calculator extends locale(LitElement) {
  render(): TemplateResult {
    return html`<div class="marks-lists">
      <label for="grades">Choose a profile picture:</label>
      <input
        type="file"
        id="grades"
        name="grades"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        @change=${this.fileLoaded.bind(this)}
      />
      <marks-grid .items=${this.marks[0]}></marks-grid>
      <marks-grid .items=${this.marks[1]}></marks-grid>
    </div>`;
  }

  static get styles(): CSSResult {
    return css`
      ${unsafeCSS(styles)}
    `;
  }

  @property()
  marks: any = [[], []];

  private headers = ["Nom", "Primer Cognom", "Segon Cognom"];

  private fileLoaded(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      ((event) => {
        const result = event.target.result;
        const workbook = XLSX.read(result, { type: "binary" });
        const marks = workbook.SheetNames.map((sheet) => {
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
          return mappedStudents.map((s) => ({
            name: s["Nom"],
            firstSurname: s["Primer Cognom"],
            secondSurname: s["Segon Cognom"],
            ...calculate(s),
          }));
        });
        this.marks = marks;
        const wb = XLSX.utils.book_new();
        const markSheets = this.marks.reduce(
          (sheets, group) =>
            sheets.concat(XLSX.utils.json_to_sheet<StudentMarks>(group)),
          []
        );
        const styledSheets = markSheets.map((s) =>
          Object.keys(s).reduce((cells, c: string) => {
            const cell = s[c];
            if (cell.mark)
              cells[c] = {
                t: "s",
                v: cell.fringe ? `${cell.mark}*` : cell.mark,
                s: {
                  fill: {
                    patternType: "none", // none / solid
                    fgColor: { rgb: "FF000000" },
                    bgColor: { rgb: "FFFFFFFF" },
                  },
                  font: {
                    name: "Times New Roman",
                    sz: 16,
                    color: { rgb: "#FF000000" },
                    bold: true,
                    italic: false,
                    underline: false,
                  },
                  border: {
                    top: { style: "thin", color: { auto: 1 } },
                    right: { style: "thin", color: { auto: 1 } },
                    bottom: { style: "thin", color: { auto: 1 } },
                    left: { style: "thin", color: { auto: 1 } },
                  },
                },
              };
            else cells[c] = cell;
            return cells;
          }, {})
        );
        styledSheets.forEach((s) => XLSX.utils.book_append_sheet(wb, s));
        XLSX.writeFile(wb, "marks.xlsx");
      }).bind(this)
    );
    reader.readAsBinaryString(file);
  }
}

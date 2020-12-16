import { watch } from "@uxland/lit-redux-connect";
import { locale } from "@uxland/uxl-prism";
import "@vaadin/vaadin-upload";
import { Guid } from "guid-typescript";
import {
  css,
  CSSResult,
  customElement,
  html,
  LitElement,
  TemplateResult,
  unsafeCSS,
} from "lit-element";
import { repeat } from "lit-html/directives/repeat";
import { exportToXLSX } from "../../../app/export-to-xlsx";
import {
  groupMarksSelector,
  exportMarksSelector,
} from "../../../app/group-marks";
import {
  setExportMarks,
  setGroupMarks,
} from "../../../app/group-marks/set-group-marks";
import { calculate } from "../../../calculator";
import "../../../components/grid";
import { moduleName } from "../../../constants";
import { GroupMarks } from "../../../domain";
import { store } from "../../../store";
import styles from "./styles.scss";
import * as XLSX from "xlsx";

@customElement(`${moduleName}-shell-content`)
export class Calculator extends locale(LitElement) {
  @watch(groupMarksSelector, { store })
  groupMarks: GroupMarks;

  @watch(exportMarksSelector, { store })
  exportMarks: GroupMarks;

  render(): TemplateResult {
    return html`<div class="marks-lists">
      <vaadin-upload
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        max-files="1"
        @files-changed=${this.fileLoaded.bind(this)}
      ></vaadin-upload>
      <vaadin-button @click=${this.exportToXLSX.bind(this)}
        >EXPORT</vaadin-button
      >
      ${this.groupMarks
        ? repeat(
            Object.keys(this.groupMarks),
            (g) =>
              html`<h1>${g}</h1>
                <marks-grid
                  .items=${this.groupMarks[g]}
                  @data-updated=${this.dataUpdated.bind(this, g)}
                ></marks-grid>`
          )
        : html`<div>waiting</div>`}
    </div>`;
  }

  static get styles(): CSSResult {
    return css`
      ${unsafeCSS(styles)}
    `;
  }

  private dataUpdated(g: string, ev) {
    setExportMarks({ ...this.exportMarks, [g]: ev.detail });
  }

  private exportToXLSX() {
    exportToXLSX(this.exportMarks);
  }

  private headers = ["Nom", "Primer Cognom", "Segon Cognom"];

  private fileLoaded(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        ((event) => {
          console.log("load");
          const result = event.target.result;
          const workbook = XLSX.read(result, { type: "binary" });
          const marks: any = workbook.SheetNames.reduce((groups, sheet) => {
            const rowObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            const mappedStudents = rowObject.map((r) =>
              Object.keys(r).reduce((mapped: any, k) => {
                if (this.headers.indexOf(k) > -1)
                  return { ...mapped, [k]: r[k] };
                else
                  return {
                    ...mapped,
                    criteria: { ...(mapped.criteria || {}), [k]: r[k] },
                  };
              }, {})
            );
            return {
              ...groups,
              [sheet]: mappedStudents.map((s) => ({
                id: Guid.create().toString(),
                name: s["Nom"] || "",
                firstSurname: s["Primer Cognom"] || "",
                secondSurname: s["Segon Cognom"] || "",
                ...calculate(s),
              })),
            };
          }, {});
          setGroupMarks(marks);
          setExportMarks(marks);
        }).bind(this)
      );
      reader.readAsBinaryString(file);
    }
  }
}

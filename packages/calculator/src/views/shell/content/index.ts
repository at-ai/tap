import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from "lit-element";
import * as XLSX from "xlsx";
import { calculate } from "../../../calculator";
import { moduleName } from "../../../constants";
import "@vaadin/vaadin-grid/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-column";
import { propertiesObserver } from "@uxland/uxl-utilities";
import { locale } from "@uxland/uxl-prism";
import { render, nothing } from "lit-html";
import "../../../components/grid";
import { repeat } from "lit-html/directives/repeat";
import { StudentMarks } from "../../../domain";

@customElement(`${moduleName}-shell-content`)
export class Calculator extends locale(LitElement) {
  render(): TemplateResult {
    return html`<label for="grades">Choose a profile picture:</label>
      <input
        type="file"
        id="grades"
        name="grades"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        @change=${this.fileLoaded.bind(this)}
      />
      <!-- ${this.marks
        ? repeat(
            this.marks,
            (group) =>
              html`<marks-grid
                .items=${group}
                .columns=${this.buildColumns(group[0])}
              ></marks-grid>`
          )
        : nothing} -->
      <!-- <div class="grid">
        <vaadin-grid
          style="width: 100vw"
          .items="${this.marks ? this.marks[0] : []}"
        >
          <vaadin-grid-column
            path="name"
            header="Nom"
            .renderer=${this.genericRenderer}
          ></vaadin-grid-column>
          <vaadin-grid-column
            path="firstSurname"
            header="Primer Cognom"
            .renderer=${this.genericRenderer}
          ></vaadin-grid-column>
          <vaadin-grid-column
            path="secondSurname"
            header="Segon Cognom"
            .renderer=${this.genericRenderer}
          ></vaadin-grid-column>
          <vaadin-grid-column
            path="D1"
            header="Dimensió 1"
            .renderer=${this.genericRenderer}
          ></vaadin-grid-column>
          <vaadin-grid-column
            path="D2"
            header="Dimensió 2"
            .renderer=${this.genericRenderer}
          ></vaadin-grid-column>
          <vaadin-grid-column
            path="D3"
            header="Dimensió 3"
            .renderer=${this.genericRenderer}
          ></vaadin-grid-column>
          <vaadin-grid-column
            path="D4"
            header="Dimensió 4"
            .renderer=${this.genericRenderer}
          ></vaadin-grid-column>
          <vaadin-grid-column
            path="D5"
            header="Dimensió 5"
            .renderer=${this.genericRenderer}
          ></vaadin-grid-column>
        </vaadin-grid>
      </div> -->
      <!-- <vaadin-grid .items=>
        <vaadin-grid-column
          path="name.first"
          header="First name"
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="name.last"
          header="Last name"
        ></vaadin-grid-column>
        <vaadin-grid-column path="location.city"></vaadin-grid-column>
        <vaadin-grid-column
          path="visitCount"
          text-align="end"
          width="120px"
          flex-grow="0"
        ></vaadin-grid-column>
      </vaadin-grid> --> `;
  }

  private buildColumns(row: any = {}) {
    const columns = Object.keys(row).reduce(
      (columns, k) =>
        columns.concat({
          path: k,
          header: k,
          renderer: this.genericRenderer.bind(this),
        }),
      []
    );
    console.log(columns);
    return columns;
  }

  private genericRenderer(root, column, rowData) {
    console.log("render");
    render(html`<div>${rowData.item[column.path]}</div> `, root);
  }

  @property()
  marks: any = [[], []];

  private headers = ["Nom", "Primer Cognom", "Segon Cognom"];

  private fileLoaded(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      const result = event.target.result;
      const workbook = XLSX.read(result, { type: "binary" });
      this.marks = workbook.SheetNames.map((sheet) => {
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
      console.log(this.marks);
      // const wb = XLSX.utils.book_new();
      // const markSheets = this.marks.reduce(
      //   (sheets, group) =>
      //     sheets.concat(XLSX.utils.json_to_sheet<StudentMarks>(group)),
      //   []
      // );
      // markSheets.forEach((s) => XLSX.utils.book_append_sheet(wb, s));
      // XLSX.writeFile(wb, "marks.xlsx");
    });
    reader.readAsBinaryString(file);
  }
}

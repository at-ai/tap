import { timeOut } from "@uxland/functional-utilities";
import { locale } from "@uxland/uxl-prism";
import { propertiesObserver } from "@uxland/uxl-utilities";
import "@vaadin/vaadin-grid/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-sort-column";
import "@vaadin/vaadin-text-field/vaadin-text-field";
import {
  css,
  CSSResult,
  customElement,
  html,
  LitElement,
  property,
  PropertyValues,
  query,
  TemplateResult,
  unsafeCSS,
} from "lit-element";
import { render } from "lit-html";
import { repeat } from "lit-html/directives/repeat";
import { StudentMarks } from "../../domain";
import styles from "./styles.scss";

interface Column {
  textAlign: "start" | "center" | "end";
  path: string;
  header: string;
  renderer: (root, column, model) => void;
}

const fixHeaders = ["name", "firstSurname", "secondSurname"];
@customElement("marks-grid")
export default class MarksGrid extends locale(propertiesObserver(LitElement)) {
  @property()
  items: any[];

  firstUpdated(changedProps: PropertyValues) {
    super.firstUpdated(changedProps);
  }

  render(): TemplateResult {
    return html`<div class="grid">
      ${this.items?.length > 0
        ? html`<vaadin-grid multi-sort>
            ${repeat(
              this.columns,
              (c) =>
                html`<vaadin-grid-sort-column
                  text-align=${c.textAlign}
                  auto-width
                  path=${c.path}
                  header=${c.header}
                  .renderer=${c.renderer}
                ></vaadin-grid-sort-column>`
            )}
          </vaadin-grid>`
        : html`<div>nodata</div>`}
    </div>`;
  }

  static get styles(): CSSResult {
    return css`
      ${unsafeCSS(styles)}
    `;
  }

  @query("vaadin-grid")
  grid: any;

  itemsChanged(items: StudentMarks[]) {
    timeOut.run(() => (this.grid.items = items), 100);
  }

  get columns(): Column[] {
    const item = this.items ? this.items[0] : {};
    return Object.keys(item)
      ?.filter((k) => k != "id")
      ?.map((k) => ({
        textAlign: fixHeaders.indexOf(k) > -1 ? "start" : "center",
        path: k,
        header: k,
        renderer:
          fixHeaders.indexOf(k) > -1
            ? this.genericRenderer.bind(this)
            : this.dimensionRenderer.bind(this),
      }));
  }

  private genericRenderer(root, column, rowData) {
    render(html`<div>${rowData.item[column.path]}</div> `, root);
  }

  private dimensionRenderer(root, column, rowData) {
    const data = rowData.item[column.path];
    if (data?.fringe)
      render(
        html`<vaadin-text-field
          .id=${rowData.item.id}
          .path=${column.path}
          .value=${data?.mark}
          @input=${this.inputChanged.bind(this)}
        ></vaadin-text-field>`,
        root
      );
    else render(html`<div>${data?.mark}</div>`, root);
  }

  private inputChanged(ev) {
    const value = ev.currentTarget.value;
    const id = ev.currentTarget.id;
    const path = ev.currentTarget.path;
    const newData = this.items.map((i) => {
      if (i.id == id) return { ...i, [path]: { ...i[path], mark: value } };
      else return i;
    });
    this.dispatchEvent(new CustomEvent("data-updated", { detail: newData }));
  }
}

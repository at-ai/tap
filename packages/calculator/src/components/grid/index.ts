import { timeOut } from "@uxland/functional-utilities";
import { locale } from "@uxland/uxl-prism";
import { propertiesObserver } from "@uxland/uxl-utilities";
import "@vaadin/vaadin-grid/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-sort-column";
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
        ? html`<vaadin-grid style="width: 100vw" multi-sort>
            ${repeat(
              this.columns,
              (c) =>
                html`<vaadin-grid-sort-column
                  text-align="start"
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
    return Object.keys(item)?.map((k) => ({
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
        html`<input
          value=${data?.mark}
          @change=${this.inputChanged.bind(this)}
        />`,
        root
      );
    else render(html`<div>${data?.mark}</div>`, root);
  }

  private inputChanged(ev) {
    console.log(ev);
  }
}

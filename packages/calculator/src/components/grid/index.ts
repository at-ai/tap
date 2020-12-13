import "@vaadin/vaadin-grid";
import {
  css,
  CSSResult,
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
  unsafeCSS,
} from "lit-element";
import { render } from "lit-html";
import styles from "./styles.scss";

@customElement("marks-grid")
export default class MarksGrid extends LitElement {
  @property()
  items: any[];

  render(): TemplateResult {
    return html`<div class="grid">
      <vaadin-grid style="width: 100vw" .items=${this.items}>
        <vaadin-grid-column
          path="name"
          header="Nom"
          .renderer=${this.genericRenderer.bind(this)}
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="firstSurname"
          header="Primer Cognom"
          .renderer=${this.genericRenderer.bind(this)}
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="secondSurname"
          header="Segon Cognom"
          .renderer=${this.genericRenderer.bind(this)}
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="D1"
          header="Dimensió comunicació oral"
          .renderer=${this.dimensionRenderer.bind(this)}
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="D2"
          header="Dimensió comprensió Lectora"
          .renderer=${this.dimensionRenderer.bind(this)}
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="D3"
          header="Dimensió expressió escrita"
          .renderer=${this.dimensionRenderer.bind(this)}
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="D4"
          header="Dimensió literària"
          .renderer=${this.dimensionRenderer.bind(this)}
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="D5"
          header="Dimensió Plurilingue i Intercultural"
          .renderer=${this.dimensionRenderer.bind(this)}
        ></vaadin-grid-column>
      </vaadin-grid>
    </div>`;
  }

  static get styles(): CSSResult {
    return css`
      ${unsafeCSS(styles)}
    `;
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

  @query("vaadin-grid")
  grid: any;
}

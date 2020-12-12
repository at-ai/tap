import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from "lit-element";
import { repeat } from "lit-html/directives/repeat";

@customElement("marks-grid")
export class MarksGrid extends LitElement {
  @property()
  items: any[];

  @property()
  columns: {
    path: string;
    header: string;
    width: string;
    renderer: () => void;
  }[];

  render(): TemplateResult {
    return html`<div class="grid">
      <vaadin-grid style="width: 100vw" .items=${this.items}>
        ${repeat(
          this.columns,
          (c) =>
            html`<vaadin-grid-column
              path=${c.path}
              header=${c.header}
              width=${c.width || this.calculateWidth(this.columns.length)}
              .renderer=${c.renderer}
            ></vaadin-grid-column>`
        )}
      </vaadin-grid>
    </div>`;
  }

  private calculateWidth(nColumns: number) {
    return `${window.innerWidth / nColumns}px`;
  }
}

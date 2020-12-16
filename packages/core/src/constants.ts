import { constantBuilder } from "@uxland/functional-utilities";

export interface Builder {
  (name: string): string;
}

export const TP = "tp";
const coreConstantBuilder = (suffix: string, separator?: string): Builder =>
  constantBuilder(TP, suffix, separator);
export const coreRegionsBuilder = coreConstantBuilder("REGION");
export const moduleConstantBuilder = (module: string) => (
  suffix: string,
  separator?: string
): Builder =>
  constantBuilder(
    `${TP.toUpperCase()}${separator || ":"}${module}`,
    suffix,
    separator
  );

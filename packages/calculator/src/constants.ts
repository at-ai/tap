import { Builder, moduleConstantBuilder } from "@tp/core";

export const moduleName = "calculator";
export const calculatorConstantBuilder = (
  suffix: string,
  separator?: string
): Builder =>
  moduleConstantBuilder(moduleName.toUpperCase())(suffix, separator);
export const calculatorActionsBuilder = calculatorConstantBuilder("ACTION");

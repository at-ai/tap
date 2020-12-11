import { criteriaDimensions } from "../master-data/criteria-dimensions";

export const getCriteriaDimensions = (criteria?: string): string[] =>
  criteriaDimensions.find((cd) => cd.id == criteria)?.dimensions;

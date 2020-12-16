import { Mark } from "../domain";
import { markValues } from "../master-data/mark-values";

export const getMarkValue = (mark?: Mark): number => markValues[mark];

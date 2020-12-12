import * as _ from "lodash";
import { Mark } from "../domain";
import { getMarkValue } from "./get-mark-value";
import { getValueMark } from "./get-value-mark";

export const getMarksMean = (
  marks?: Mark[]
): { mark: Mark; fringe: boolean } => {
  const mark = _.mean(marks?.map((m) => getMarkValue(m)));
  const fringe = Math.floor(mark) < Math.round(mark);
  return { mark: getValueMark(Math.round(mark)), fringe };
};
// getValueMark(Math.round(_.mean(marks?.map((m) => getMarkValue(m)))));

import * as _ from "lodash";
import { Mark } from "../domain";
import { getMarkValue } from "./get-mark-value";
import { getValueMark } from "./get-value-mark";

export const getMarksMean = (
  marks?: Mark[]
): { mark: Mark; value: number; fringe: boolean } => {
  const mark = _.mean(marks?.map((m) => getMarkValue(m)));
  const fringe = (Math.round(mark * 10) / 10) % 1 == 0.5;
  return {
    mark: getValueMark(Math.round(mark)),
    value: Math.round(mark * 10) / 10,
    fringe,
  };
};
// getValueMark(Math.round(_.mean(marks?.map((m) => getMarkValue(m)))));

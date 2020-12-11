import * as _ from "lodash";
import { Mark } from "../domain";
import { getMarkValue } from "./get-mark-value";
import { getValueMark } from "./get-value-mark";

export const getMarksMean = (marks?: Mark[]): Mark =>
  getValueMark(Math.round(_.mean(marks?.map((m) => getMarkValue(m)))));

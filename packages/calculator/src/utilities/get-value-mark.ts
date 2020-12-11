import { Mark } from "../domain";
import * as _ from "lodash";
import { markValues } from "../master-data/mark-values";

export const getValueMark = (value?: number): Mark =>
  _.invert(markValues)[value];

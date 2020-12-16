import { GroupMarks } from "../../domain";
import { State } from "../../store";

export const groupMarksSelector = (state: State): GroupMarks =>
  state?.groupMarks;
export const exportMarksSelector = (state: State): GroupMarks =>
  state?.exportMarks;

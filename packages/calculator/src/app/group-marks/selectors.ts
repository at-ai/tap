import { GroupMarks } from "../../domain";
import { State } from "../../store";

export const groupMarksSelector = (state: State): GroupMarks =>
  state?.groupMarks;

import { createBasicReducer } from "@uxland/uxl-redux";
import { calculatorActionsBuilder } from "../constants";
import { GroupMarks, StudentMarks } from "../domain";

export const SET_GROUP_MARKS = calculatorActionsBuilder("SET-GROUP-MARKS");
export const SET_EXPORT_MARKS = calculatorActionsBuilder("SET-EXPORT-MARKS");
export const groupMarksReducer = createBasicReducer<GroupMarks>(
  SET_GROUP_MARKS
);
export const exportMarksReducer = createBasicReducer<GroupMarks>(
  SET_EXPORT_MARKS
);

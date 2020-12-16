import { createAction } from "@uxland/uxl-redux";
import { GroupMarks } from "../../domain";
import { dispatch } from "../../store";
import { SET_EXPORT_MARKS, SET_GROUP_MARKS } from "../../store/group-marks";

export const setGroupMarks = (groupMarks: GroupMarks) =>
  dispatch(createAction(SET_GROUP_MARKS)(groupMarks));
export const setExportMarks = (groupMarks: GroupMarks) =>
  dispatch(createAction(SET_EXPORT_MARKS)(groupMarks));

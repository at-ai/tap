import { GroupMarks, StudentMarks } from "../../domain";
import { dispatch } from "../../store";
import { SET_GROUP_MARKS } from "../../store/group-marks";

import { createAction } from "@uxland/uxl-redux";

export const setGroupMarks = (groupMarks: GroupMarks) =>
  dispatch(createAction(SET_GROUP_MARKS)(groupMarks));

import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Store,
  Dispatch,
} from "redux";
import thunk from "redux-thunk";
import { moduleName } from "../constants";
import { GroupMarks, StudentMarks } from "../domain";
import { groupMarksReducer as groupMarks } from "./group-marks";
import * as R from "ramda";

export let store: Store;

export interface State {
  groupMarks: GroupMarks;
}

const composeEnhancers =
  (typeof (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ == "function" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      name: `${document.title} - ${moduleName}`,
    })) ||
  compose;
const initializeStore = () => {
  store = createStore(
    combineReducers({
      groupMarks,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

store = initializeStore();
export const getState: () => State = R.bind(store.getState, store);
export const dispatch: Dispatch = R.bind(store.dispatch, store);

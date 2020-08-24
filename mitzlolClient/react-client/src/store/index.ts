import { combineReducers } from "redux";
import { MitzlolState } from "./state/state_types";
import { mitzlolReducer } from "./state/reducer";

// Redux will updates application state property using the reducer with the matching name, hence
// it's important that the names match exactly.
export interface ApplicationState {
  mitzlol: MitzlolState;
}
export const rootReducer = combineReducers({
  mitzlol: mitzlolReducer,
});

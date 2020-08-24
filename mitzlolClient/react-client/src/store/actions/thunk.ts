import { Action } from "redux";
import api from "../../api/mitzlolim";
import * as ACTIONS_CREATORS from "./actions_creators";
import { ThunkAction } from "redux-thunk";

export const thunkGetMitzlolim = (
  word: string
): ThunkAction<void, unknown, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  dispatch(ACTIONS_CREATORS.getMitzlolimRequest());
  const asyncResp = await api.getMitzlolim(
    word,
    (data: string[]) => {
      dispatch(ACTIONS_CREATORS.getMitzlolimSuccess(data));
    },
    (message: string) => {
      dispatch(ACTIONS_CREATORS.getMitzlolimError(message));
    }
  );
  return asyncResp;
};

import { MitzlolActionType } from "../actions/actions_types";

export const getMitzlolimRequest = () => {
  return {
    type: MitzlolActionType.GET_MITZLOLIM_REQUEST,
  };
};
export const getMitzlolimSuccess = (data: string[]) => {
  return {
    type: MitzlolActionType.GET_MITZLOLIM_SUCCESS,
    payload: data,
  };
};
export const getMitzlolimError = (message: string) => {
  return {
    type: MitzlolActionType.GET_MITZLOLIM_ERROR,
    payload: message,
  };
};

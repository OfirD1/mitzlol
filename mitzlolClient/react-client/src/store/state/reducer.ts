import { Reducer } from "redux";
import { MitzlolActionType } from "../actions/actions_types";
import { MitzlolState } from "./state_types";

const initialState: MitzlolState = {
  mitzlolim: [],
  total: -1,
  loading: false,
};

const reducer: Reducer<MitzlolState> = (
  state = initialState,
  action
): MitzlolState => {
  switch (action.type) {
    case MitzlolActionType.GET_MITZLOLIM_REQUEST: {
      return { ...state, loading: true };
    }
    case MitzlolActionType.GET_MITZLOLIM_SUCCESS: {
      return {
        loading: false,
        mitzlolim: action.payload.words,
        total: action.payload.total,
      };
    }
    case MitzlolActionType.GET_MITZLOLIM_ERROR: {
      return { loading: false, mitzlolim: [], total: 0 };
    }
    default: {
      return state;
    }
  }
};

export { reducer as mitzlolReducer };

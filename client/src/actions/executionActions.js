import { Actions } from "../constants/actions";

export const toggleLiveExecution = value => dispatch => {
  dispatch({
    type: Actions.Execution.SET_LIVE_EXECUTION,
    data: value
  });
};

import { Actions } from "../constants/actions";

const executionReducer = (state = false, action) => {
  switch (action.type) {
    case Actions.Execution.SET_LIVE_EXECUTION:
      return action.data;
    default:
      return state;
  }
};

export default executionReducer;

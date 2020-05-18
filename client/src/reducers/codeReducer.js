import { Actions } from "../constants/actions";

const codeReducer = (state = "//type your code here", action) => {
  switch (action.type) {
    case Actions.Code.SET_CODE:
      return action.data;
    default:
      return state;
  }
};

export default codeReducer;

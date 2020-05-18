import { Actions } from "../constants/actions";

const languageReducer = (state = "javascript", action) => {
  switch (action.type) {
    case Actions.Languages:
      return action.data;
    default:
      return state;
  }
};

export default languageReducer;

import { Actions } from "../constants/actions";

const themesReducer = (state = "dark", action) => {
  switch (action.type) {
    case Actions.Themes.SET_THEME:
      return action.data;
    default:
      return state;
  }
};

export default themesReducer;

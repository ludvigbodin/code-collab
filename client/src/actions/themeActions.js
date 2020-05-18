import { Actions } from "../constants/actions";

export const toggleTheme = theme => dispatch => {
  dispatch({
    type: Actions.Themes.SET_THEME,
    data: theme === "dark" ? "light" : "dark"
  });
};

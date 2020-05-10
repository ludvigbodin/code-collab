import { Actions } from "../constants/actions";

export const setUser = user => dispatch => {
  dispatch({
    type: Actions.User.SET_USER,
    data: user
  });
};

import { Actions } from "../constants/actions";

export const updateCodeInStore = value => dispatch => {
  dispatch({
    type: Actions.Code.SET_CODE,
    data: value
  });
};

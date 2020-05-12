import { Actions } from "../constants/actions";

export const setUser = user => dispatch => {
  dispatch({
    type: Actions.User.SET_USER,
    data: user
  });
};

export const setUserId = userId => dispatch => {
  dispatch({
    type: Actions.User.SET_USER_ID,
    data: userId
  });
};

export const setUserHasJoinedRoom = value => dispatch => {
  dispatch({
    type: Actions.User.SET_USER_HAS_JOINED_ROOM,
    data: value
  });
};

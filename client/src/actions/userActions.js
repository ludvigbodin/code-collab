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

export const setUserRoomInfo = data => dispatch => {
  dispatch({
    type: Actions.User.SET_USER_ROOM_INFO,
    data: data
  });
};

export const setUserName = name => dispatch => {
  dispatch({
    type: Actions.User.SET_USER_NAME,
    data: name
  });
};

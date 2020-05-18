import { Actions } from "../constants/actions";
import { post, get } from "./restClient";
import history from "../history";
import { setUserRoomInfo } from "./userActions";
import { notifyError } from "../utils/toaster";

const Room = Actions.Room;

export const createRoom = roomName => async dispatch => {
  const url = "/api/room/create";
  const data = { roomName: roomName };

  try {
    const json = await post(url, data);
    history.push("/" + json.roomId);
  } catch (err) {
    notifyError(err.message);
  }
};

export const validateRoom = roomId => async dispatch => {
  document.log(roomId);
  const url = `api/room/validate/${roomId}`;
  try {
    const json = await get(url);
    dispatch(setUserRoomInfo({ validated: true, roomName: json.roomName }));
  } catch (err) {
    history.push("/");
    notifyError(err.message);
  }
};

/* export const joinRoom = roomId => async dispatch => {
  document.log(roomId);
  const url = `api/room/join/${roomId}`;
  try {
    const json = await get(url);
    dispatch(setUserRoomInfo({ validated: true, roomName: json.roomName }));
    notifyInfo("You have joined room " + json.roomName);
  } catch (err) {
    history.push("/");
    notifyError(err.message);
  }
}; */

export const setRoomData = room => dispatch => {
  dispatch({
    type: Room.SET_ROOM_DATA,
    data: room
  });
};

export const setRoomUsers = users => dispatch => {
  dispatch({
    type: Room.SET_ROOM_USERS,
    data: users
  });
};

export const addUserToRoom = user => dispatch => {
  dispatch({
    type: Room.ADD_USER_TO_ROOM,
    data: user
  });
};

export const removeUserFromRoom = user => dispatch => {
  dispatch({
    type: Room.REMOVE_USER_FROM_ROOM,
    data: user
  });
};

export const updateUserCursorCordinates = (
  userId,
  cursorCoordinates
) => dispatch => {
  dispatch({
    type: Room.UPDATE_USER_CURSOR_COORDINATES,
    data: {
      userId: userId,
      cursorCoordinates: cursorCoordinates
    }
  });
};

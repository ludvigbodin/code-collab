import { Actions } from "../constants/actions";
import { post, get } from "./restClient";
import history from "../history";
import { setUserHasJoinedRoom } from "./userActions";
import { notifyError, notifyInfo } from "../utils/toaster";

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

export const joinRoom = roomId => async dispatch => {
  document.log(roomId);
  const url = `api/join/${roomId}`;
  try {
    const json = await get(url);
    dispatch(setUserHasJoinedRoom(true));
    notifyInfo("You have joined room " + json.roomName);
  } catch (err) {
    history.push("/");
    notifyError(err.message);
  }
};

// OLD

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

export const testAction = roomName => async dispatch => {
  const url = "api/room/test";
  const data = { roomName: roomName };

  const response = await post(url, data);
  const result = await response.json();
  document.log(result);
};

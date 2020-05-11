import { Actions } from "../constants/actions";
import { post, get } from "./restClient";

const Room = Actions.Room;

export const createRoom = roomName => async dispatch => {
  const url = "api/room/test";
  const data = { roomName: roomName };

  const response = await post(url, data);
  const result = await response.json();
  document.log(result);
};

export const joinRoom = roomUUID => async dispatch => {
  const url = `api/room/join/${roomUUID}`;
  const response = await get(url);
  const result = await response.json();
};

export const setRoomData = room => dispatch => {
  dispatch({
    type: Room.SET_ROOM,
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

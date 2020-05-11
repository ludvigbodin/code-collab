import { Actions } from "../constants/actions";
import { post, get } from "./restClient";
import history from "../history";

const Room = Actions.Room;

export const createRoom = roomName => async dispatch => {
  const url = "/api/room/create";
  const data = { roomName: roomName };

  try {
    const response = await post(url, data);
    const result = await response.json();
    history.push("/" + result.roomId);
  } catch (err) {
    alert("Something went wrong");
  }
};

export const joinRoom = roomId => async dispatch => {
  document.log(roomId);
  const url = `api/join/${roomId}`;
  try {
    const response = await get(url);
    const result = await response.json();
    document.log(result);
  } catch (err) {
    history.push("/");
    alert("The room doesnt exist anymore");
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

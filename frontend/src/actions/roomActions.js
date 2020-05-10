import { Actions } from "../constants/actions";

const Room = Actions.Room;

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

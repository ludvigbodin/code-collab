import { Actions } from "../constants/actions";

const initState = { users: [], room: "", master: "" };

const roomReducer = (state = initState, action) => {
  switch (action.type) {
    case Actions.Room.SET_ROOM:
      return action.data;
    case Actions.Room.SET_ROOM_USERS:
      return {
        ...state,
        users: action.data
      };
    default:
      return state;
  }
};

export default roomReducer;

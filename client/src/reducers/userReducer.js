import { Actions } from "../constants/actions";

const User = Actions.User;

const userReducer = (
  state = {
    id: "",
    name: "",
    userRoomInfo: { validated: false, roomName: "" }
  },
  action
) => {
  switch (action.type) {
    case User.SET_USER:
      return action.data;
    case User.SET_USER_ID: {
      return {
        ...state,
        id: action.data
      };
    }
    case User.SET_USER_ROOM_INFO: {
      return {
        ...state,
        userRoomInfo: action.data
      };
    }
    case User.SET_USER_NAME: {
      return {
        ...state,
        name: action.data
      };
    }
    default:
      return state;
  }
};

export default userReducer;

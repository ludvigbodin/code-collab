import { Actions } from "../constants/actions";

const initState = { users: [], roomName: "" };

const roomReducer = (state = initState, action) => {
  switch (action.type) {
    case Actions.Room.SET_ROOM_DATA:
      return {
        ...state,
        ...action.data
      };
    case Actions.Room.SET_ROOM_USERS:
      return {
        ...state,
        users: action.data
      };
    case Actions.Room.ADD_USER_TO_ROOM: {
      return {
        ...state,
        users: [...state.users, action.data]
      };
    }
    case Actions.Room.REMOVE_USER_FROM_ROOM: {
      return {
        ...state,
        users: state.users.filter(
          user => user.socketId !== action.data.socketId
        )
      };
    }
    case Actions.Room.UPDATE_USER_CURSOR_COORDINATES:
      return {
        ...state,
        users: state.users.map(user => {
          if (user._id === action.data.userId) {
            return {
              ...user,
              cursorCoordinates: action.data.cursorCoordinates
            };
          }
          return user;
        })
      };
    default:
      return state;
  }
};

export default roomReducer;

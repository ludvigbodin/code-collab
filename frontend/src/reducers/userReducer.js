import { Actions } from "../constants/actions";

const User = Actions.User;

/* const userReducer = (state = "", action) => {
  switch (action.type) {
    case User.SET_USER:
      return action.data;
    default:
      return state;
  }
};
 */
const userReducer = (state = { id: "", hasJoinedRoom: false }, action) => {
  switch (action.type) {
    case User.SET_USER:
      return action.data;
    case User.SET_USER_ID: {
      return {
        ...state,
        id: action.data
      };
    }
    case User.SET_USER_HAS_JOINED_ROOM: {
      return {
        ...state,
        hasJoinedRoom: action.data
      };
    }
    default:
      return state;
  }
};

export default userReducer;

import { Actions } from "../constants/actions";

const User = Actions.User;

const userReducer = (state = "", action) => {
  switch (action.type) {
    case User.SET_USER:
      return action.data;
    default:
      return state;
  }
};

export default userReducer;

import { combineReducers } from "redux";
import themesReducer from "./themeReducer";
import languageReducer from "./languageReducer";
import roomReducer from "./roomReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  theme: themesReducer,
  language: languageReducer,
  room: roomReducer,
  user: userReducer
});

export default rootReducer;

import { combineReducers } from "redux";
import themesReducer from "./themeReducer";
import languageReducer from "./languageReducer";
import roomReducer from "./roomReducer";
import userReducer from "./userReducer";
import executionReducer from "./executionReducer";

const rootReducer = combineReducers({
  theme: themesReducer,
  language: languageReducer,
  room: roomReducer,
  user: userReducer,
  liveExecution: executionReducer
});

export default rootReducer;

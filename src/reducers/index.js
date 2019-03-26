import { combineReducers } from "redux";

import ProfileReducer from "./profileReducer.js";
import settingsReducer from "./settingsReducer.js";
import bluetoothReducer from "./bluetoothReducer.js";

export default combineReducers({
  profile: ProfileReducer,
  bluetooth: bluetoothReducer,
  settings: settingsReducer
});

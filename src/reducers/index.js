import { combineReducers } from "redux";

import ProfileReducer from "./profileReducer.js";
import settingsReducer from "./settingsReducer.js";
import bluetoothReducer from "./bluetoothReducer.js";
import firebaseReducer from "./firebaseReducer.js";

//this functions takes all the individual Redux reducers and combines them into one object that can be imported into any React component.
export default combineReducers({
  profile: ProfileReducer,
  bluetooth: bluetoothReducer,
  settings: settingsReducer,
  firebase: firebaseReducer
});

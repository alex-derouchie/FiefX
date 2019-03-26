import { createStore } from "redux";
import reducer from "./reducers";

//This simply serves to be able to export the Redux state to JS files which are not React Components
const store = createStore(reducer);

export default store;

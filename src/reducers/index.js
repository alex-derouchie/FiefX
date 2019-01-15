import {combineReducers} from 'redux';

import ColorReducer from './colorReducer.js';
import ProfileReducer from './profileReducer.js';

export default combineReducers({
    color: ColorReducer,
    profile: ProfileReducer
});
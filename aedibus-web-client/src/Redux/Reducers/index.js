import { combineReducers } from 'redux';
import authReducer from "./authReducer";
import coursesReducer from "./coursesReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    courses: coursesReducer,
});

export default rootReducer;
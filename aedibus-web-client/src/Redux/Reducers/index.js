import { combineReducers } from 'redux';
import authReducer from "./authReducer";
import coursesReducer from "./coursesReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    courses: coursesReducer,
    error: errorReducer,
});

export default rootReducer;
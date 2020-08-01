import * as CourseActions from '../Actions/courseActions';

const initialState = {
    lastUpdated: null,
    isFetching: null,
    list: [],
};

const coursesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CourseActions.GET_COURSES_REQUEST:
            return {
                ...state,
                lastUpdated: action.lastUpdated,
                isFetching: action.isFetching,
            };
        case CourseActions.GET_COURSES_SUCCESS:
            return {
                ...state,
                lastUpdated: action.lastUpdated,
                isFetching: action.isFetching,
                list: action.list,
            };
        default:
            return state;
    }
}

export default coursesReducer;
import * as AuthActions from '../Actions/authActions';

const initialState = {
    lastUpdated: null,
    isAuthenticated: false,
    isFetching: null,
    user: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthActions.SIGN_IN_REQUEST:
            return {
                ...state,
                lastUpdated: action.lastUpdated,
                isAuthenticated: action.isAuthenticated,
                isFetching: action.isFetching,
            };
        case AuthActions.SIGN_IN_SUCCESS:
            return {
                ...state,
                lastUpdated: action.lastUpdated,
                isAuthenticated: action.isAuthenticated,
                isFetching: action.isFetching,
                user: action.user
            };
        case AuthActions.SIGN_UP_REQUEST:
            return {
                ...state,
                lastUpdated: action.lastUpdated,
                isAuthenticated: action.isAuthenticated,
                isFetching: action.isFetching,
            };
        case AuthActions.SIGN_UP_SUCCESS:
            return {
                ...state,
                lastUpdated: action.lastUpdated,
                isAuthenticated: action.isAuthenticated,
                isFetching: action.isFetching,
                user: action.user
            };
        case AuthActions.LOGOUT_REQUEST:
            return {
                ...state,
                lastUpdated: action.lastUpdated,
                isFetching: action.isFetching
            };
        case AuthActions.LOGOUT_SUCCESS:
            return {
                ...state,
                lastUpdated: action.lastUpdated,
                isAuthenticated: action.isAuthenticated,
                isFetching: action.isFetching,
                user: action.user
            };
        default:
            return state;
    }
}

export default authReducer;
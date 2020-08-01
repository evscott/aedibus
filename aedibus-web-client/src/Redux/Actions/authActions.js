import fetch from "cross-fetch";

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

function signInRequest() {
    return {
        type: SIGN_IN_REQUEST,
        lastUpdated: Date.now(),
        isAuthenticated: true,
        isFetching: true
    }
}

function signInSuccess(user) {
    return {
        type: SIGN_IN_SUCCESS,
        lastUpdated: Date.now(),
        isAuthenticated: true,
        isFetching: false,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    }
}

function signUpRequest() {
    return {
        type: SIGN_UP_REQUEST,
        lastUpdated: Date.now(),
        isAuthenticated: true,
        isFetching: true
    }
}

function signUpSuccess(user) {
    return {
        type: SIGN_UP_SUCCESS,
        lastUpdated: Date.now(),
        isAuthenticated: true,
        isFetching: false,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    }
}

function logoutRequest() {
    return {
        type: LOGOUT_REQUEST,
        lastUpdated: Date.now(),
        isFetching: true
    }
}

function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS,
        lastUpdated: Date.now(),
        isAuthenticated: false,
        isFetching: false,
        user: {
            firstName: null,
            lastName: null,
            email: null,
        },
    }
}

export function SignIn(email, password) {
    console.log('signing in with', email, password)
    return (dispatch) => {
        dispatch(signInRequest());

        let payload = {
            email: email,
            password: password,
        }
        
        fetch('http://127.0.0.1:2020/v1/auth', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify(payload),
        }).then((response) => response.json())
        .then((json) => {
            localStorage.setItem('ac-token', json.token);
            dispatch(signInSuccess(json));
        })
    }
}

export function SignUp(name, email, password) {
    console.log('signing up with', name, email, password)
    return (dispatch) => {
        dispatch(signUpRequest());

        let payload = {
            name: name,
            email: email,
            password: password,
        }
        
        fetch('http://127.0.0.1:2020/v1/auth', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(payload),
        }).then((response) => response.json())
        .then((json) => {
            localStorage.setItem('ac-token', json.token);
            dispatch(signUpSuccess(json));
        })
    }
}

export function Logout() {
    return (dispatch) => {
        dispatch(logoutRequest());
        dispatch(logoutSuccess());
        localStorage.removeItem('token');
    }
}
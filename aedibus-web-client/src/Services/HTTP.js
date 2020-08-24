import fetch from "cross-fetch";

const DOMAIN = 'http://127.0.0.1';
const PORT = ':2020'
const TOKEN_KEY = 'aedibus-api-token'

/**
 * Performs an HTTP GET request.
 * @param path the endpoint path to target
 * @returns an HTTP response
 */
export const HttpGet = async (path) => {
    return fetch(`${DOMAIN}${PORT}${path}`, {
        headers: {
            'aedibus-api-token': localStorage.getItem(TOKEN_KEY)
        },
        method: 'GET',
    })
}


/**
 * Performs an HTTP POST request with a form-data payload.
 * @param path the endpoint path to target
 * @param payload the form-data payload to post
 * @returns an HTTP response
 */
export const HttpPostForm = async (path, payload) => {
    return fetch(`${DOMAIN}${PORT}${path}`, {
        headers: {
            'aedibus-api-token': localStorage.getItem(TOKEN_KEY)
        },
        method: 'POST',
        body: payload,
    })
}

/**
 * Performs an HTTP POST request with a JSON payload.
 * @param path the endpoint path to target
 * @param payload a json-payload to post
 * @returns an HTTP response
 */
export const HttpPostJSON  = async (path, payload) => {
    return fetch(`${DOMAIN}${PORT}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            'aedibus-api-token': localStorage.getItem(TOKEN_KEY)
        },
        method: 'POST',
        body: payload,
    })
}

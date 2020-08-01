export const GET_COURSES_REQUEST = 'GET_COURSES_REQUEST';
export const GET_COURSES_SUCCESS = 'GET_COURSES_SUCCESS';

function getChallengesRequest() {
    return {
        type: GET_COURSES_REQUEST,
        lastUpdated: Date.now(),
        isFetching: true
    }
}

function getChallengesSuccess(courses) {
    return {
        type: GET_COURSES_SUCCESS,
        lastUpdated: Date.now(),
        isFetching: false,
        list: courses,
    }
}

export function GetCourses() {
    return (dispatch) => {
        dispatch(getChallengesRequest());
        
        // fetch('http://127.0.0.1:2020/v1/u/challenges', {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'ac-token': localStorage.getItem('ac-token'),
        //     },
        //     method: 'GET',
        // }).then((response) => response.json())
        // .then((json) => {
        //     dispatch(getChallengesSuccess(json));
        // })

        dispatch(getChallengesSuccess([
            {
                id: "0",
                description: "course 0"
            },
            {
                id: "1",
                description: "course 1"
            },
            {
                id: "2",
                description: "course 2"
            }
        ]))
    }
}
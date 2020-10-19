const initialState = {
    timestamp: null,
    code: null,
    message: null,
};

const errorReducer = (state = initialState, action) => {
    const { error } = action;

    if (error){
        return {
            timestamp: error.timestamp,
            code: error.code,
            message: error.message,
        }
    }

    return state;
}
export default errorReducer;
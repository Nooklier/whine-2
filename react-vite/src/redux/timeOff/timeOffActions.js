import { CREATE_TIME_OFF_REQUEST, CREATE_TIME_OFF_SUCCESS, CREATE_TIME_OFF_ERROR } from "./timeOffTypes";

// CREATE TIME OFF REQUEST
export const createTimeOffRequest = () => ({
    type: CREATE_TIME_OFF_REQUEST,
});

export const createTimeOffSuccess = (timeOffRequest) => ({
    type: CREATE_TIME_OFF_SUCCESS,
    payload: timeOffRequest
});

export const createTimeOffError = (error) => ({
    type: CREATE_TIME_OFF_ERROR,
    payload: error
});



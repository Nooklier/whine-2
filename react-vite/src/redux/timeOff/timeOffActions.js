import { CREATE_TIME_OFF_REQUEST, CREATE_TIME_OFF_REQUEST_SUCCESS, CREATE_TIME_OFF_REQUEST_FAILURE } from './timeOffTypes';
import { FETCH_TIME_OFF_REQUESTS, FETCH_TIME_OFF_REQUESTS_SUCCESS, FETCH_TIME_OFF_REQUESTS_FAILURE } from './timeOffTypes';
import { DELETE_TIME_OFF_REQUEST, DELETE_TIME_OFF_REQUEST_SUCCESS, DELETE_TIME_OFF_REQUEST_FAILURE } from './timeOffTypes';
import { UPDATE_TIME_OFF_REQUEST,UPDATE_TIME_OFF_REQUEST_SUCCESS, UPDATE_TIME_OFF_REQUEST_FAILURE } from './timeOffTypes';

// CREATE TIME OFF REQUEST
export const createTimeOffRequestAction = () => ({
    type: CREATE_TIME_OFF_REQUEST,
});

export const createTimeOffRequestSuccess = (data) => ({
    type: CREATE_TIME_OFF_REQUEST_SUCCESS,
    payload: data,
});

export const createTimeOffRequestFailure = (error) => ({
    type: CREATE_TIME_OFF_REQUEST_FAILURE,
    payload: error,
});



// GET ALL TIME OFF REQUEST OF CURRENT USER
export const fetchTimeOffRequestsAction = () => ({
    type: FETCH_TIME_OFF_REQUESTS,
});

export const fetchTimeOffRequestsSuccess = (data) => ({
    type: FETCH_TIME_OFF_REQUESTS_SUCCESS,
    payload: data,
});

export const fetchTimeOffRequestsFailure = (error) => ({
    type: FETCH_TIME_OFF_REQUESTS_FAILURE,
    payload: error,
});



// DELETE TIME OFF REQUEST
export const deleteTimeOffRequestAction = () => ({
    type: DELETE_TIME_OFF_REQUEST,
});

export const deleteTimeOffRequestSuccess = (id) => ({
    type: DELETE_TIME_OFF_REQUEST_SUCCESS,
    payload: id,
});

export const deleteTimeOffRequestFailure = (error) => ({
    type: DELETE_TIME_OFF_REQUEST_FAILURE,
    payload: error,
});


// UPDATE TIME OFF REQUEST
export const updateTimeOffRequestAction = () => ({
    type: UPDATE_TIME_OFF_REQUEST,
});

export const updateTimeOffRequestSuccess = (data) => ({
    type: UPDATE_TIME_OFF_REQUEST_SUCCESS,
    payload: data,
});

export const updateTimeOffRequestFailure = (error) => ({
    type: UPDATE_TIME_OFF_REQUEST_FAILURE,
    payload: error,
});

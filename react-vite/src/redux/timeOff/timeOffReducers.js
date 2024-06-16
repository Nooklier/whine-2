import { CREATE_TIME_OFF_REQUEST, CREATE_TIME_OFF_REQUEST_SUCCESS, CREATE_TIME_OFF_REQUEST_FAILURE } from './timeOffTypes';
import { FETCH_TIME_OFF_REQUESTS, FETCH_TIME_OFF_REQUESTS_SUCCESS, FETCH_TIME_OFF_REQUESTS_FAILURE } from './timeOffTypes';
import { DELETE_TIME_OFF_REQUEST, DELETE_TIME_OFF_REQUEST_SUCCESS, DELETE_TIME_OFF_REQUEST_FAILURE } from './timeOffTypes';
import { UPDATE_TIME_OFF_REQUEST, UPDATE_TIME_OFF_REQUEST_SUCCESS, UPDATE_TIME_OFF_REQUEST_FAILURE } from './timeOffTypes';


const initialState = {
    loading: false,
    request: null,
    error: null
};

const timeOffReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TIME_OFF_REQUEST:
            return {
                ...state,
                loading: true
            };
        case CREATE_TIME_OFF_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                request: action.payload,
                error: null
            };
        case CREATE_TIME_OFF_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case FETCH_TIME_OFF_REQUESTS:
            return {
                ...state,
                loading: true,
            };
        case FETCH_TIME_OFF_REQUESTS_SUCCESS:
            return {
                ...state,
                loading: false,
                requests: action.payload,
                error: null,
            };
        case FETCH_TIME_OFF_REQUESTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_TIME_OFF_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_TIME_OFF_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                requests: state.requests.filter(request => request.id !== action.payload),
                error: null,
            };
        case DELETE_TIME_OFF_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_TIME_OFF_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_TIME_OFF_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                requests: state.requests.map(request =>
                    request.id === action.payload.id ? action.payload : request
                ),
                error: null,
            };
        case UPDATE_TIME_OFF_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default timeOffReducer;

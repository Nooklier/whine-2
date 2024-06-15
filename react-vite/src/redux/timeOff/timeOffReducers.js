import { act } from "react";
import { CREATE_TIME_OFF_REQUEST, CREATE_TIME_OFF_SUCCESS, CREATE_TIME_OFF_ERROR } from "./timeOffTypes";

const initialState = {
    loading: false,
    byUserId: {},
    error: null
}

const normalizeTimeOffData = (data) => {
    const byUserId = {}

    data.forEach(item => {
        if (!byUserId[item.user_id]) {
            byUserId[item.user_id] = []
        }

        byUserId[item.user_id].push(item)
    })

    return byUserId
}

const timeOffReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TIME_OFF_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case CREATE_TIME_OFF_SUCCESS:
            const newRequest = action.payload;
            const userId = newRequest.user_id;
            const userRequests = state.byUserId[userId] || [];

            return {
                ...state,
                loading: false,
                byUserId: {
                    ...state.byUserId,
                    [userId]: [...userRequests, newRequest]
                },
            };
        case CREATE_TIME_OFF_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state
    }
}

export default timeOffReducer;
import { FETCH_PTO_REQUEST, FETCH_PTO_SUCCESS, FETCH_PTO_ERROR } from "./ptoTypes";

const initialState = {
    loading: false,
    byId: {},
    error: null
}

const normalizeData = (data) => {
    const byId = {}

    data.forEach(item => {
        byId[item.id] = item;
    });

    return byId;
}

const ptoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PTO_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_PTO_SUCCESS:
            return {
                ...state,
                loading: false,
                byId: normalizeData(action.payload)
            };
        case FETCH_PTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state
    }
}

export default ptoReducer;
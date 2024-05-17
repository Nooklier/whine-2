import { FETCH_PTO_REQUEST, FETCH_PTO_SUCCESS, FETCH_PTO_ERROR } from "./ptoTypes";

export const fetchPtoRequest = () => ({
    type: FETCH_PTO_REQUEST
});

export const fetchPtoSuccess = (pto) => ({
    type: FETCH_PTO_SUCCESS,
    payload: pto
});

export const fetchPtoError = (error) => ({
    type: FETCH_PTO_ERROR,
    payload: error
})
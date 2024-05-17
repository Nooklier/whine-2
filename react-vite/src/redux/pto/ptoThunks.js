import { fetchPtoRequest, fetchPtoSuccess, fetchPtoError } from "./ptoActions";

// Fetch current user's PTO
export const fetchPto = () => {
    return async (dispatch) => {
        dispatch(fetchPtoRequest())
        
        try {
            const response = await fetch('/api/pto/current')

            if (!response.ok) {
                throw new Error('Failed to fetch PTO')
            }

            const data = await response.json()
            dispatch(fetchPtoSuccess(data))
        } catch (error) {
            dispatch(fetchPtoError(error.message))
        }
    }
}
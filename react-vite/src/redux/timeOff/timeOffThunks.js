import { createTimeOffRequest, createTimeOffSuccess, createTimeOffError } from "./timeOffActions";

// CREATE TIME OFF REQUEST
export const postTimeOffRequest = (data) => {
    return async (dispatch) => {
        dispatch(createTimeOffRequest())

        try {
            const response = await fetch('/api/timeoff/create', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error('Failed to create time off request')
            }

            const result = await response.json()
            dispatch(createTimeOffSuccess(result))
        } catch (error) {
            dispatch(createTimeOffError(error.message))
        }
    }
}
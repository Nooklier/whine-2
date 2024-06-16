import { createTimeOffRequestAction, createTimeOffRequestSuccess, createTimeOffRequestFailure } from './timeOffActions';
import { fetchTimeOffRequestsAction, fetchTimeOffRequestsSuccess, fetchTimeOffRequestsFailure } from './timeOffActions';
import { deleteTimeOffRequestAction, deleteTimeOffRequestSuccess, deleteTimeOffRequestFailure } from './timeOffActions';
import { updateTimeOffRequestAction, updateTimeOffRequestSuccess, updateTimeOffRequestFailure } from './timeOffActions';

// CREATE TIME OFF REQUEST
export const createTimeOffRequest = (timeOffData) => async (dispatch) => {
    dispatch(createTimeOffRequestAction());

    try {
        const response = await fetch('/api/timeoff/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(timeOffData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create time off request');
        }

        const data = await response.json();
        const action = createTimeOffRequestSuccess(data);
        dispatch(action);
        return action; 
    } catch (error) {
        const action = createTimeOffRequestFailure(error.message);
        dispatch(action);
        return action; 
    }
};



// GET TIME OFF REQUESTS OF CURRENT USER
export const fetchTimeOffRequests = () => async (dispatch) => {
    dispatch(fetchTimeOffRequestsAction());

    try {
        const response = await fetch('/api/timeoff/current', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch time off requests');
        }

        const data = await response.json();
        dispatch(fetchTimeOffRequestsSuccess(data));
    } catch (error) {
        dispatch(fetchTimeOffRequestsFailure(error.message));
    }
};


// DELETE TIME OFF REQUESTS
export const deleteTimeOffRequest = (id) => async (dispatch) => {
    dispatch(deleteTimeOffRequestAction());

    try {
        const response = await fetch(`/api/timeoff/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to delete time off request');
        }

        dispatch(deleteTimeOffRequestSuccess(id));
    } catch (error) {
        dispatch(deleteTimeOffRequestFailure(error.message));
    }
};


// UPDATE TIME OFF REQUESTS
export const updateTimeOffRequest = (id, timeOffData) => async (dispatch) => {
    dispatch(updateTimeOffRequestAction());

    try {
        const response = await fetch(`/api/timeoff/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(timeOffData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update time off request');
        }

        const data = await response.json();
        const action = updateTimeOffRequestSuccess(data);
        dispatch(action);
        return action; // Return the action
    } catch (error) {
        const action = updateTimeOffRequestFailure(error.message);
        dispatch(action);
        return action; // Return the action
    }
};
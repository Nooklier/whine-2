/********************* ACTION TYPES *********************/

const GET_SHIFTS = 'shifts/getShifts';
const UPDATE_SHIFT = 'shifts/updateShift';
const GET_SHIFT_BY_ID = 'shifts/getShiftById';
const GET_SHIFTS_BY_USER_ID = 'shifts/getShiftsByUserId';

/********************* ACTION CREATORS *********************/

const getShifts = (shifts) => ({
    type: GET_SHIFTS,
    payload: shifts  
  });

const updateShift = (shift) => ({
  type: UPDATE_SHIFT,
  payload: shift
});

const getShiftById = (shift) => ({
    type: GET_SHIFT_BY_ID,
    payload: shift  
});

const getShiftsByUserId = (shifts) => ({
  type: GET_SHIFTS_BY_USER_ID,
  payload: shifts
});


/********************* THUNK ACTION CREATORS *********************/

export const fetchShifts = () => async (dispatch) => {
    try {
        const response = await fetch("/api/shift/current");

        if (response.ok) {
          const shifts = await response.json();
          dispatch(getShifts(shifts));
        } else {
          console.error("Failed to fetch shifts: HTTP status", response.status);
        }
    } catch (error) {
        console.error("Error fetching shifts:", error);
    }
}

export const updateShiftInfo = (shiftId, updatedInfo) => async (dispatch) => {
    try {
      const response = await fetch(`/api/shift/update/${shiftId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedInfo)
      });
  
      if (response.ok) {
        const updatedShift = await response.json();
        dispatch(updateShift(updatedShift));
      } else {
        console.error("Failed to update shift: HTTP status", response.status);
      }
    } catch (error) {
      console.error("Error updating shift:", error);
    }
}

export const fetchShiftById = (shiftId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/shift/${shiftId}`);
      if (response.ok) {
          const shift = await response.json();
          dispatch(getShiftById(shift));
    } else {
          console.error("Failed to fetch shift by ID: HTTP status", response.status);
    }
    } catch (error) {
            console.error("Error fetching shift by ID:", error);
    }
}

export const fetchShiftsByUserId = () => async (dispatch) => {
  try {
    const response = await fetch(`/api/shift/current`);

    if (response.ok) {
      const shifts = await response.json();
      dispatch(getShiftsByUserId(shifts));
    } else {
      console.error("Failed to fetch shifts by user ID: HTTP status", response.status);
    }
  } catch (error) {
    console.error("Error fetching shifts by user ID:", error);
  }
};

/********************* REDUCERS *********************/

const initialState = { 
  shifts: []
};

let updatedShifts;

function shiftsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SHIFTS:
      return { ...state, shifts: action.payload };
    case UPDATE_SHIFT:
      updatedShifts = state.shifts.map(shift =>
        shift.id === action.payload.id ? action.payload : shift
      );
      return { ...state, shifts: updatedShifts };
    case GET_SHIFT_BY_ID:
      return { ...state, shift: action.payload };
    case GET_SHIFTS_BY_USER_ID:
      return { ...state, shifts: action.payload };
      
    default:
      return state;
  }
}

export default shiftsReducer;

/********************* ACTION TYPES *********************/

const GET_SHIFTS = 'shifts/getShifts';

/********************* ACTION CREATORS *********************/

const getShifts = (shifts) => ({
    type: GET_SHIFTS,
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

/********************* REDUCERS *********************/

const initialState = { shifts: [] };

function shiftsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SHIFTS:
      return { ...state, shifts: action.payload };
    default:
      return state;
  }
}

export default shiftsReducer;

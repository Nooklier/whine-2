/********************* ACTION TYPES *********************/

const UPDATE_SHIFT = 'shifts/updateShift';
const UPDATE_SHIFT_SUCCESS = 'shifts/updateShiftSuccess';
const UPDATE_SHIFT_FAILURE = 'shifts/updateShiftFailure';

const DELETE_SHIFT = 'shifts/deleteShift';
const DELETE_SHIFT_SUCCESS = 'shifts/deleteShiftSuccess';
const DELETE_SHIFT_FAILURE = 'shifts/deleteShiftFailure';

const CREATE_SHIFT = 'shifts/createShift';
const CREATE_SHIFT_SUCCESS = 'shifts/createShiftSuccess';
const CREATE_SHIFT_FAILURE = 'shifts/createShiftFailure';

const GET_SHIFT_BY_ID = 'shifts/getShiftById';
const GET_SHIFTS_BY_USER_ID = 'shifts/getShiftsByUserId';
const GET_ALL_SHIFTS = 'shifts/getAllShifts';


/********************* ACTION CREATORS *********************/

const updateShift = () => ({
  type: UPDATE_SHIFT,
});

const updateShiftSuccess = (shift) => ({
  type: UPDATE_SHIFT_SUCCESS,
  payload: shift
});

const updateShiftFailure = (error) => ({
  type: UPDATE_SHIFT_FAILURE,
  payload: error
});

const getShiftById = (shift) => ({
  type: GET_SHIFT_BY_ID,
  payload: shift
});

const getShiftsByUserId = (shifts) => ({
  type: GET_SHIFTS_BY_USER_ID,
  payload: shifts
});

const getAllShifts = (shifts) => ({
  type: GET_ALL_SHIFTS,
  payload: shifts
});

const deleteShift = () => ({
  type: DELETE_SHIFT,
});

const deleteShiftSuccess = (shiftId) => ({
  type: DELETE_SHIFT_SUCCESS,
  payload: shiftId
});

const deleteShiftFailure = (error) => ({
  type: DELETE_SHIFT_FAILURE,
  payload: error
});

const createShift = () => ({
  type: CREATE_SHIFT,
});

const createShiftSuccess = (shift) => ({
  type: CREATE_SHIFT_SUCCESS,
  payload: shift
});

const createShiftFailure = (error) => ({
  type: CREATE_SHIFT_FAILURE,
  payload: error
});




/********************* THUNK ACTION CREATORS *********************/

export const updateShiftInfo = (shiftId, updatedInfo) => async (dispatch) => {
  dispatch(updateShift());
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
      dispatch(updateShiftSuccess(updatedShift));
    } else {
      const error = await response.text();
      dispatch(updateShiftFailure(error));
    }
  } catch (error) {
    dispatch(updateShiftFailure(error.toString()));
  }
};

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
};

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

export const fetchAllShifts = () => async (dispatch) => {
  try {
    const response = await fetch(`/api/shift/all`);

    if (response.ok) {
      const shifts = await response.json();
      dispatch(getAllShifts(shifts));
    } else {
      console.error("Failed to fetch all shifts: HTTP status", response.status);
    }
  } catch (error) {
    console.error("Error fetching all shifts:", error);
  }
};

export const deleteShiftById = (shiftId) => async (dispatch) => {
  dispatch(deleteShift());
  try {
    const response = await fetch(`/api/shift/delete/${shiftId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      dispatch(deleteShiftSuccess(shiftId));
    } else {
      const error = await response.text();
      dispatch(deleteShiftFailure(error));
    }
  } catch (error) {
    dispatch(deleteShiftFailure(error.toString()));
  }
};

export const createNewShift = (shiftData) => async (dispatch) => {
  dispatch(createShift());
  try {
    const response = await fetch('/api/shift/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shiftData)
    });

    if (response.ok) {
      const newShift = await response.json();
      dispatch(createShiftSuccess(newShift));
    } else {
      const error = await response.text();
      dispatch(createShiftFailure(error));
    }
  } catch (error) {
    dispatch(createShiftFailure(error.toString()));
  }
};



/********************* REDUCERS *********************/

const initialState = { 
  shifts: [],
  allShifts: [],
  loading: false,
  error: null,
};

let updatedShifts;

function shiftsReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SHIFT:
      return { ...state, loading: true, error: null };
    case UPDATE_SHIFT_SUCCESS:
      updatedShifts = state.shifts.map(shift =>
        shift.id === action.payload.id ? action.payload : shift
      );
      return { ...state, 
        shifts: updatedShifts, 
        allShifts: state.allShifts.map(shift =>
          shift.id === action.payload.id ? action.payload : shift
        ),
        loading: false };
    case UPDATE_SHIFT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_SHIFT_BY_ID:
      return { ...state, shift: action.payload };
    case GET_SHIFTS_BY_USER_ID:
      return { ...state, shifts: action.payload };
    case GET_ALL_SHIFTS:
      return { ...state, allShifts: action.payload };
    case DELETE_SHIFT:
      return { ...state, loading: true, error: null };
    case DELETE_SHIFT_SUCCESS:
      return {
        ...state,
        shifts: state.shifts.filter(shift => shift.id !== action.payload),
        allShifts: state.allShifts.filter(shift => shift.id !== action.payload),
        loading: false
      };
    case DELETE_SHIFT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_SHIFT:
      return { ...state, loading: true, error: null };
    case CREATE_SHIFT_SUCCESS:
      return { ...state, allShifts: [...state.allShifts, action.payload], loading: false };
    case CREATE_SHIFT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default shiftsReducer;



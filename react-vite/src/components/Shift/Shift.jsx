import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchShiftsByUserId } from "../../redux/shift";

function Shifts() {
    const dispatch = useDispatch();
    const shifts = useSelector(state => state.shifts.shifts);
    const userId = useSelector(state => state.session.user.id)

    console.log(shifts, '!!!!!!')

    useEffect(() => {
        dispatch(fetchShiftsByUserId(userId));
    }, [dispatch]);

    return (
        <div>
            <h1>Shifts</h1>
            {Array.isArray(shifts) && shifts.map(shift => (
                <div key={shift.id}>
                    <NavLink to={`/shift/${shift.id}`}>
                        <p>{shift.shift_date} : {shift.shift_start} - {shift.shift_end}</p>
                    </NavLink>
                </div>
            ))}
        </div>
    );
}

export default Shifts;

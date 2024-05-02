import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchShiftById, updateShiftInfo } from "../../redux/shift";
import { useDispatch, useSelector } from "react-redux";

function ShiftDetails() {
    const { shiftId } = useParams();
    const dispatch = useDispatch();
    const shift = useSelector(state => state.shifts.shift);

    useEffect(() => {
        if (shiftId) {
            dispatch(fetchShiftById(shiftId));
        }
    }, [dispatch, shiftId]);

    const handleGiveAway = async () => {
        await dispatch(updateShiftInfo(shiftId, { available: true }))
    }

    if (!shift) {
        return 'Loading ....';
    }

    return (
        <div>
            <div>{shift.shift_date}</div>
            <div>{shift.shift_start}</div>
            <div>{shift.shift_end}</div>
            <button onClick={handleGiveAway}>GIVE AWAY</button>
        </div>
    );
}

export default ShiftDetails;

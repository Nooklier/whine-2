import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchShiftById, updateShiftInfo } from '../../redux/shift';

function EditShift() {
    const { shiftId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const shift = useSelector(state => state.shifts.shift);
    const [formData, setFormData] = useState({
        shift_date: '',
        shift_start: '',
        shift_end: '',
        user_id: ''
    });

    useEffect(() => {
        dispatch(fetchShiftById(shiftId));
    }, [dispatch, shiftId]);

    useEffect(() => {
        if (shift) {
            setFormData({
                shift_date: shift.shift_date,
                shift_start: shift.shift_start,
                shift_end: shift.shift_end,
                user_id: shift.user_id
            });
        }
    }, [shift]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateShiftInfo(shiftId, formData))
            .then(() => {
                navigate('/allshifts');
            })
            .catch(error => {
                console.error('Failed to update shift:', error);
            });
    };

    return (
        <div className="edit-shift-container">
            <h2>Edit Shift</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Shift Date:</label>
                    <input
                        type="date"
                        name="shift_date"
                        value={formData.shift_date}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Shift Start:</label>
                    <input
                        type="time"
                        name="shift_start"
                        value={formData.shift_start}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Shift End:</label>
                    <input
                        type="time"
                        name="shift_end"
                        value={formData.shift_end}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>User ID:</label>
                    <input
                        type="text"
                        name="user_id"
                        value={formData.user_id}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Shift</button>
            </form>
        </div>
    );
}

export default EditShift;

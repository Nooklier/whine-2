import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewShift } from '../../redux/shift';

function CreateShift() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);
    console.log('hahahhaha' , user)

    const [formData, setFormData] = useState({
        shift_date: '',
        shift_start: '',
        shift_end: '',
        user_id: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createNewShift(formData)).then(() => {
            navigate('/allshifts');
        });
    };

    if (user.role !== 'manager') {
        return <div>You are not authorized to create a new shift.</div>;
    }

    return (
        <div className="create-shift-container">
            <h2>Create New Shift</h2>
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
                <button type="submit">Create Shift</button>
            </form>
        </div>
    );
}

export default CreateShift;

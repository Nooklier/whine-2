import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTimeOffRequest, fetchTimeOffRequests } from '../../redux/timeOff/timeOffThunks';

function EditTimeOffRequest() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const timeOffRequests = useSelector(state => state.timeOff.requests || []);
    const requestToEdit = timeOffRequests.find(request => request.id === parseInt(id));

    const [formData, setFormData] = useState({
        start_date: '',
        end_date: '',
        pto_use: 0
    });

    useEffect(() => {
        if (!requestToEdit) {
            dispatch(fetchTimeOffRequests());
        } else {
            setFormData({
                start_date: requestToEdit.start_date,
                end_date: requestToEdit.end_date,
                pto_use: requestToEdit.pto_use
            });
        }
    }, [dispatch, requestToEdit]);

    const handleUpdateTimeOffRequest = () => {
        dispatch(updateTimeOffRequest(id, formData)).then(response => {
            if (response.type === 'UPDATE_TIME_OFF_REQUEST_SUCCESS') {
                navigate('/timeoff');
            }
        });
    };

    if (!requestToEdit) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-time-off-request">
            <h2>Edit Time Off Request</h2>
            <div>
                <div>Start Date</div>
                <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                />
            </div>
            <div>
                <div>End Date</div>
                <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                />
            </div>
            <div>
                <div>PTO Use</div>
                <input
                    type="number"
                    name="pto_use"
                    value={formData.pto_use}
                    onChange={(e) => setFormData({ ...formData, pto_use: parseInt(e.target.value, 10) })}
                />
            </div>
            <button onClick={handleUpdateTimeOffRequest}>UPDATE</button>
        </div>
    );
}

export default EditTimeOffRequest;

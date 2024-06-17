import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { thunkLogout } from "../../redux/session";
import { updateTimeOffRequest, fetchTimeOffRequests } from '../../redux/timeOff/timeOffThunks';
import searchIcon from '../../../photos/search-icon.png';
import scheduleIcon from '../../../photos/schedule-icon.png';
import timeOffIcon from '../../../photos/time-off-icon.png';
import ptoIcon from '../../../photos/pto-icon.png';
import settingIcon from '../../../photos/setting-icon.png';
import signOutIcon from '../../../photos/sign-out-icon.png';

function EditTimeOffRequest() {
    const { id } = useParams();
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const timeOffRequests = useSelector(state => state.timeOff.requests || []);
    const requestToEdit = timeOffRequests.find(request => request.id === parseInt(id));

    const [formData, setFormData] = useState({
        start_date: '',
        end_date: '',
        pto_use: 0
    });

    const [errors, setErrors] = useState({});

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

    const validateForm = () => {
        const errors = {};
        if (!formData.start_date) errors.start_date = "Start date is required";
        if (!formData.end_date) errors.end_date = "End date is required";
        if (formData.pto_use < 0) errors.pto_use = "PTO use must be a positive number";
        setErrors(errors);
        return errors;
    };

    const handleUpdateTimeOffRequest = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            const response = await dispatch(updateTimeOffRequest(id, formData));
            if (response.type === 'UPDATE_TIME_OFF_REQUEST_SUCCESS') {
                navigate('/timeoff');
            } else {
                setErrors(response.payload);
            }
        }
    };

    if (!requestToEdit) {
        return <div>Loading...</div>;
    }

    const handleLogout = () => {
        dispatch(thunkLogout());
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-inside-container">
                <div className="dashboard-left-container">
                    <div>
                        <div className="dashboard-menu">Menu</div>
                        <div className="search-container">
                            <input className='search-bar' type="search" placeholder="SEARCH"></input>
                            <img className='search-icon' src={searchIcon} onClick={() => alert('Feature coming soon!')} alt="search"></img>
                        </div>
                        <div className="name">{user.first_name} {user.last_name}</div>
                        <div className="menu-container">
                            <div className="nav-link-container">
                                <img className='navlink-icon' src={scheduleIcon} alt="schedule"></img>
                                <NavLink className='nav-link' to='/shift'>SCHEDULE</NavLink>
                            </div>
                            <div className="nav-link-container-timeoff">
                                <img className='navlink-icon' src={timeOffIcon} alt="time off request"></img>
                                <NavLink className='nav-link' to='/timeoff'>TIME OFF REQUEST</NavLink>
                            </div>
                            <div className="nav-link-container">
                                <img className='navlink-icon' src={ptoIcon} alt="pto"></img>
                                <NavLink className='nav-link' to='/pto'>PTO</NavLink>
                            </div>
                            {user.role === 'Manager' && (
                                <div className="nav-link-container">
                                    <img className='navlink-icon' src={scheduleIcon} alt="all shifts"></img>
                                    <NavLink className='nav-link' to='/allshifts'>ALL SHIFTS</NavLink>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bottom-container">
                        <div className="left-bottom-container">
                            <img className='navlink-icon' src={settingIcon} alt="settings"></img>
                            <div className='setting' onClick={() => alert('Feature coming soon!')}>SETTINGS</div>
                        </div>
                        <div className="left-bottom-container">
                            <img className='navlink-icon' src={signOutIcon} alt="sign out"></img>
                            <NavLink style={{textDecoration: 'none'}} onClick={handleLogout} to='/'>SIGN OUT</NavLink>
                        </div>
                    </div>
                </div>

                <div className="middle-container">
                    <div className="edit-time-off-request">
                        <h2>Edit Time Off Request</h2>
                        {errors && (
                            <div className="error-messages">
                                {Object.values(errors).map((error, index) => (
                                    <p key={index} className="error">{error}</p>
                                ))}
                            </div>
                        )}
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
                </div>

                <div className="right-container">
                    <div className="noticeboard">NOTICEBOARD</div>
                    <div className="noticeboard-container">
                        <div className="noticeboard-container-inside">
                            <img className='navlink-icon' src={scheduleIcon} alt="mandatory training"></img>
                            <div onClick={() => alert('Feature coming soon!')}>mandatory training</div>
                        </div>
                        <div className="noticeboard-container-inside">
                            <img className='navlink-icon' src={scheduleIcon} alt="mandatory training"></img>
                            <div onClick={() => alert('Feature coming soon!')}>TEAM MEMBER SIGNATURE REMINDER</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default EditTimeOffRequest;

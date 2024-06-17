import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchPto } from "../../redux/pto/ptoThunks";
import { thunkLogout } from "../../redux/session";
import { createTimeOffRequest, fetchTimeOffRequests, deleteTimeOffRequest } from "../../redux/timeOff/timeOffThunks"; 
import searchIcon from '../../../photos/search-icon.png';
import scheduleIcon from '../../../photos/schedule-icon.png';
import timeOffIcon from '../../../photos/time-off-icon.png';
import ptoIcon from '../../../photos/pto-icon.png';
import settingIcon from '../../../photos/setting-icon.png';
import signOutIcon from '../../../photos/sign-out-icon.png';
import './TimeOff.css';

function TimeOffRequest() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const navigate = useNavigate();
    const loading = useSelector(state => state.timeOff.loading);
    const error = useSelector(state => state.timeOff.error);
    const timeOffRequestsFromState = useSelector(state => state.timeOff.requests || []);
    
    const [formData, setFormData] = useState({
        start_date: '',
        end_date: '',
        pto_use: 0
    });

    const [timeOffRequests, setTimeOffRequests] = useState(timeOffRequestsFromState);

    useEffect(() => {
        dispatch(fetchPto());
        dispatch(fetchTimeOffRequests());
    }, [dispatch]);

    useEffect(() => {
        setTimeOffRequests(timeOffRequestsFromState);
    }, [timeOffRequestsFromState]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleLogout = () => {
        dispatch(thunkLogout());
    };

    const handleCreateTimeOff = () => {
        dispatch(createTimeOffRequest(formData)).then(response => {
            if (response.type === 'CREATE_TIME_OFF_REQUEST_SUCCESS') {
                setTimeOffRequests([...timeOffRequests, response.payload]);
            }
        });
    };

    const handleDeleteTimeOffRequest = (id) => {
        dispatch(deleteTimeOffRequest(id)).then(response => {
            if (response.type === 'DELETE_TIME_OFF_REQUEST_SUCCESS') {
                setTimeOffRequests(timeOffRequests.filter(request => request.id !== id));
            }
        });
    };

    const handleEdit = (id) => {
        navigate(`/timeoff/edit/${id}`); 
    };    

    const timeOffRequestsList = timeOffRequests.map((request) => (
        <div key={request.id} className="time-off-request">
            <div className="time-off-request-date">Start Date: {request.start_date}</div>
            <div className="time-off-request-date">End Date: {request.end_date}</div>
            <div className="time-off-request-pto">PTO Use: {request.pto_use}</div>
            <button className="time-off-request-button" onClick={() => handleDeleteTimeOffRequest(request.id)}>Delete</button>
            <button className="time-off-request-button" onClick={() => handleEdit(request.id)}>Edit</button>
        </div>
    ));

    return (
        <div className="dashboard-container">
            <div className="dashboard-inside-container">

                <div className="dashboard-left-container">
                    <div>
                        <div className="dashboard-menu">Menu</div>
                        <div className="search-container">
                            <input className='search-bar'type="search" placeholder="SEARCH"></input>
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
                            {user.role === 'manager' && (
                                <div className="nav-link-container">
                                    <img className='navlink-icon' src={scheduleIcon} alt="all shifts"></img>
                                    <NavLink className='nav-link' to='/allshifts'>ALL SHIFTS</NavLink>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bottom-container">
                        <div className="left-bottom-container">
                            <img className='navlink-icon' src={settingIcon}></img>
                            <div className='setting' onClick={() => alert('Feature coming soon!')}>SETTINGS</div>
                        </div>
                        <div className="left-bottom-container">
                            <img className='navlink-icon' src={signOutIcon}></img>
                            <NavLink style={{textDecoration: 'none'}} onClick={handleLogout} to='/'>SIGN OUT</NavLink>
                        </div>
                    </div>
                </div>

                <div className="middle-container">
                    <div className="header-container">
                        <div className="header-title">Time Off Request</div>
                    </div>
                    <div className="pto-container">
                        <div className="pto-inside-container">
                            <div className="pto-title">Create Time Off Request</div>
                            <div>Start Date</div>
                            <input
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                            />
                            <div>End Date</div>
                            <input
                                type="date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                            />
                            <div>PTO Request</div>
                            <input
                                type="number"
                                name="pto_use"
                                value={formData.pto_use}
                                onChange={(e) => setFormData({ ...formData, pto_use: parseInt(e.target.value, 10) })}
                            />
                            <button onClick={handleCreateTimeOff}>CREATE</button>
                        </div>
                    </div>
                    <div className="upcoming-container-timeoff">
                        <div className="time-off-title">My Time Off Requests</div>
                        <div className="timeoff-list">{timeOffRequestsList}</div>
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

export default TimeOffRequest;

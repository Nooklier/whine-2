import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllShifts, deleteShiftById } from "../../redux/shift";
import { thunkLogout } from "../../redux/session";
import { NavLink } from "react-router-dom";
import searchIcon from '../../../photos/search-icon.png';
import scheduleIcon from '../../../photos/schedule-icon.png';
import timeOffIcon from '../../../photos/time-off-icon.png';
import ptoIcon from '../../../photos/pto-icon.png';
import settingIcon from '../../../photos/setting-icon.png';
import signOutIcon from '../../../photos/sign-out-icon.png';
import './AllShifts.css';

function AllShifts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allShifts = useSelector(state => state.shifts.allShifts);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchAllShifts());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(thunkLogout());
    };

    const handleEditShift = (shiftId) => {
        navigate(`/shift/edit/${shiftId}`);
    };

    const handleDeleteShift = (shiftId) => {
        dispatch(deleteShiftById(shiftId));
    };

    const handleCreateShift = () => {
        navigate('/shift/create');
    };

    const sortedShifts = Array.isArray(allShifts)
        ? allShifts.sort((a, b) => new Date(a.shift_date) - new Date(b.shift_date))
        : [];

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
                            <div className="nav-link-container">
                                <img className='navlink-icon' src={timeOffIcon} alt="time off request"></img>
                                <NavLink className='nav-link' to='/timeoff'>TIME OFF REQUEST</NavLink>
                            </div>
                            <div className="nav-link-container">
                                <img className='navlink-icon' src={ptoIcon} alt="pto"></img>
                                <NavLink className='nav-link' to='/pto'>PTO</NavLink>
                            </div>
                            <div className="nav-link-container-schedule">
                                <img className='navlink-icon' src={scheduleIcon} alt="all shifts"></img>
                                <NavLink className='nav-link' to='/allshifts'>ALL SHIFTS</NavLink>
                            </div>
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
                    <div className="dashboard">All Shifts</div>
                    <button onClick={handleCreateShift}>Create New Shift</button>
                    <div className="upcoming-container-timeoff">
                        <div className="ul-container">
                            {Array.isArray(sortedShifts) && sortedShifts.length > 0 ? (
                                sortedShifts.map(shift => (
                                    <div key={shift.id}>
                                        <div className='schedule'>
                                            <div>{shift.shift_date}</div>
                                            <div className="schedule-inside">
                                                <div>{shift.shift_start} - {shift.shift_end}</div>
                                                <div>{shift.user?.first_name} {shift.user?.last_name}</div>
                                                <button onClick={() => handleEditShift(shift.id)}>Edit</button>
                                                <button onClick={() => handleDeleteShift(shift.id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>No shifts available.</div>
                            )}
                        </div>
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
                            <img className='navlink-icon' src={scheduleIcon} alt="team member signature reminder"></img>
                            <div onClick={() => alert('Feature coming soon!')}>TEAM MEMBER SIGNATURE REMINDER</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllShifts;

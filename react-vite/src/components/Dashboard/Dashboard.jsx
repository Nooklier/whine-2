import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchShiftsByUserId, fetchAllShifts } from '../../redux/shift';  
import "./Dashboard.css";
import { NavLink } from "react-router-dom";
import { thunkLogout } from "../../redux/session";
import searchIcon from '../../../photos/search-icon.png';
import scheduleIcon from '../../../photos/schedule-icon.png';
import timeOffIcon from '../../../photos/time-off-icon.png';
import ptoIcon from '../../../photos/pto-icon.png';
import settingIcon from '../../../photos/setting-icon.png';
import signOutIcon from '../../../photos/sign-out-icon.png';

function Dashboard() {
    const user = useSelector(state => state.session.user);
    const shifts = useSelector(state => state.shifts.shifts);
    const allShifts = useSelector(state => state.shifts.allShifts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchShiftsByUserId());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(thunkLogout());
    };

    const handleFetchAllShifts = () => {
        dispatch(fetchAllShifts());
    };

    const getNext7Shifts = (shifts) => {
        const today = new Date();
        // Filter and sort shifts by date
        const sortedShifts = shifts
            .filter(shift => new Date(shift.shift_date) >= today)
            .sort((a, b) => new Date(a.shift_date) - new Date(b.shift_date));
        // Get the next 7 shifts
        return sortedShifts.slice(0, 7);
    };

    const next7Shifts = getNext7Shifts(shifts);

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
                        </div>
                    </div>

                    <div className="bottom-container">
                        <div className="left-bottom-container">
                            <img className='navlink-icon' src={settingIcon} alt="settings"></img>
                            <div className='setting' onClick={() => alert('Feature coming soon!')}>SETTINGS</div>
                        </div>
                        <div className="left-bottom-container">
                            <img className='navlink-icon' src={signOutIcon} alt="sign out"></img>
                            <NavLink style={{ textDecoration: 'none' }} onClick={handleLogout} to='/'>SIGN OUT</NavLink>
                        </div>
                    </div>
                </div>

                <div className="middle-container">
                    <div className="dashboard">Dashboard</div>
                    <div className="upcoming-container">
                        <div className="upcoming">Upcoming</div>
                        <div className="ul-container">
                            {next7Shifts.map(shift => (
                                <div className='upcoming-ul' key={shift.id}>
                                    <div> {shift.shift_date} </div>
                                    <div> {shift.shift_start} - {shift.shift_end} </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleFetchAllShifts}>Fetch All Shifts</button>
                        {allShifts.length > 0 && (
                            <div className="all-shifts-container">
                                <div className="all-shifts">All Shifts</div>
                                <div className="ul-container">
                                    {allShifts.map(shift => (
                                        <div className='upcoming-ul' key={shift.id}>
                                            <div> {shift.shift_date} </div>
                                            <div> {shift.shift_start} - {shift.shift_end} </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
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

export default Dashboard;

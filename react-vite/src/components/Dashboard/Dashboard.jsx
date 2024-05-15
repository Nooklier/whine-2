import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchShifts } from '../../redux/shift';  
import "./Dashboard.css";
import { NavLink } from "react-router-dom";
import { thunkLogout } from "../../redux/session"
import searchIcon from '../../../photos/search-icon.png'
import scheduleIcon from '../../../photos/schedule-icon.png'
import timeOffIcon from '../../../photos/time-off-icon.png'
import ptoIcon from '../../../photos/pto-icon.png'
import settingIcon from '../../../photos/setting-icon.png'
import signOutIcon from '../../../photos/sign-out-icon.png'

function Dashboard() {
    const user = useSelector(state => state.session.user);
    const shifts = useSelector(state => state.shifts.shifts)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchShifts())
    }, [dispatch])

    const handleFetchShifts = async () => {
        await dispatch(fetchShifts());
    };

    const handleLogout = () => {
        dispatch(thunkLogout())
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-inside-container">

                <div className="dashboard-left-container">
                    <div>
                        <div className="dashboard-menu">Menu</div>
                        <div className="search-container">
                            <input className='search-bar'type="search" placeholder="SEARCH"></input>
                            <img className='search-icon'src={searchIcon} alt="search"></img>
                        </div>
                        <div className="name">{user.first_name} {user.last_name}</div>
                        <div className="menu-container">
                            <div className="nav-link-container">
                                <img className='navlink-icon' src={scheduleIcon} alt="schedule"></img>
                                <NavLink className='nav-link' to='/shift'>SCHEDULE</NavLink>
                            </div>
                            <div className="nav-link-container">
                                <img className='navlink-icon' src={timeOffIcon} alt="time off request"></img>
                                <NavLink className='nav-link' >TIME OFF REQUEST</NavLink>
                            </div>
                            <div className="nav-link-container">
                                <img className='navlink-icon' src={ptoIcon} alt="pto"></img>
                                <NavLink className='nav-link' >PTO</NavLink>
                            </div>
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

                <div>
                    <div>Dashboard</div>
                    <div>
                        <div>Upcoming</div>
                        <ul>
                            {shifts.map(shift => (
                                <ul key={shift.id}>{shift.shift_date}: {shift.shift_start} - {shift.shift_end}</ul>
                            ))}
                        </ul>
                    </div>
                </div>

                <div>
                    <div>NOTICEBOARD</div>
                    <ul>
                        <li>MANDATORY TRAINING</li>
                        <li>TEAM MEMBER SIGNATURE REMINDER</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

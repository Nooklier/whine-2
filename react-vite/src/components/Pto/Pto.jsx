import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchShiftsByUserId } from "../../redux/shift";
import { thunkLogout } from "../../redux/session"
import searchIcon from '../../../photos/search-icon.png'
import scheduleIcon from '../../../photos/schedule-icon.png'
import timeOffIcon from '../../../photos/time-off-icon.png'
import ptoIcon from '../../../photos/pto-icon.png'
import settingIcon from '../../../photos/setting-icon.png'
import signOutIcon from '../../../photos/sign-out-icon.png'
import './Pto.css'


function Pto() {
    const dispatch = useDispatch();
    const shifts = useSelector(state => state.shifts.shifts);
    const userId = useSelector(state => state.session.user.id)
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchShiftsByUserId(userId));
    }, [dispatch, userId]);

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
                                <NavLink className='nav-link' >TIME OFF REQUEST</NavLink>
                            </div>
                            <div className="nav-link-container-pto">
                                <img className='navlink-icon' src={ptoIcon} alt="pto"></img>
                                <NavLink className='nav-link' to='/pto'>PTO</NavLink>
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



                <div className="middle-container">
                    <div className="dashboard">Paid Time Off</div>
                    <div className="pto-container">
                        <div className="pto-inside-container">
                            <div className="pto-title">Total PTO</div>
                            <div className="pto">80 Hours</div>
                        </div>
                        <div className="pto-inside-container">
                            <div className="pto-title">Used PTO</div>
                            <div className="pto">40 Hours</div>
                        </div>
                        <div className="pto-inside-container">
                            <div className="pto-title">Available PTO</div>
                            <div className="pto">40 Hours</div>
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
                            <img className='navlink-icon' src={scheduleIcon} alt="mandatory training"></img>
                            <div onClick={() => alert('Feature coming soon!')}>TEAM MEMBER SIGNATURE REMINDER</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Pto;

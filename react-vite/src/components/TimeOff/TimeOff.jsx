import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchPto } from "../../redux/pto/ptoThunks";
import { thunkLogout } from "../../redux/session"
import searchIcon from '../../../photos/search-icon.png'
import scheduleIcon from '../../../photos/schedule-icon.png'
import timeOffIcon from '../../../photos/time-off-icon.png'
import ptoIcon from '../../../photos/pto-icon.png'
import settingIcon from '../../../photos/setting-icon.png'
import signOutIcon from '../../../photos/sign-out-icon.png'
import './TimeOff.css'


function TimeOffRequest() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const loading = useSelector(state => state.pto.loading);
    const error = useSelector(state => state.pto.error);

    useEffect(() => {
        dispatch(fetchPto())
    }, [dispatch])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

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
                            <div className="nav-link-container-timeoff">
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
                        <button>CREATE</button>
                    </div>
                    <div className="pto-container">
                        <div className="pto-inside-container">
                            <div className="pto-title">Status</div>
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

export default TimeOffRequest;

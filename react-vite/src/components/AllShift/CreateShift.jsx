import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewShift } from '../../redux/shift';
import { NavLink } from "react-router-dom";
import { thunkLogout } from "../../redux/session";
import searchIcon from '../../../photos/search-icon.png';
import scheduleIcon from '../../../photos/schedule-icon.png';
import timeOffIcon from '../../../photos/time-off-icon.png';
import ptoIcon from '../../../photos/pto-icon.png';
import settingIcon from '../../../photos/setting-icon.png';
import signOutIcon from '../../../photos/sign-out-icon.png';

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

    const handleLogout = () => {
        dispatch(thunkLogout());
    };

    if (user.role !== 'manager') {
        return <div>You are not authorized to create a new shift.</div>;
    }

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

export default CreateShift;

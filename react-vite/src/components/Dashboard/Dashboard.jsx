import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchShifts } from '../../redux/shift';  
import "./Dashboard.css";
import { NavLink } from "react-router-dom";
import { thunkLogout } from "../../redux/session"

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
            <div className="menu-container">
                <div>Menu</div>
                <div>{user.first_name} {user.last_name}</div>
                <ul>
                    <NavLink to='/shift'>SCHEDULE</NavLink>
                    <li>TIME OFF REQUEST</li>
                    <li>PTO</li>
                </ul>
                <div>
                    <li>SETTINGS</li>
                    <li>SIGN OUT</li>
                </div>
            </div>

            <div className="dashboard-container-inside">
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

            <div className="noticeboard-container">
                <div>NOTICEBOARD</div>
                <ul>
                    <li>MANDATORY TRAINING</li>
                    <li>TEAM MEMBER SIGNATURE REMINDER</li>
                </ul>
                <button onClick={handleFetchShifts}>Fetch Shifts</button>
            </div>
            <button onClick={handleLogout}>LOG OUT</button>
        </div>
    );
}

export default Dashboard;

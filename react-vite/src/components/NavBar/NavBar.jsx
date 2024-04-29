import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thunkLogout } from "../../redux/session"
import logo from "../../../photos/logo.png"
import "./NavBar.css"

function NavBar() {
    const location = useLocation()
    const dispatch = useDispatch()
    const hiddenPaths = ['/login', '/signup', '/dashboard']


    if (hiddenPaths.includes(location.pathname)) {
        return null;
    }

    function showAlert() {
        alert('Feature coming soon!')
    }

    const handleLogout = () => {
        dispatch(thunkLogout())
    }

    return (
        <div className="navbar-container">
            <NavLink to='/'>
                <img src={logo} alt="website logo" className="logo"></img>
            </NavLink>
            <ul className="navbar-ul-container">
                <ul className="navbar-ul" onClick={showAlert}>FEATURES</ul>
                <ul className="navbar-ul" onClick={showAlert}>PRICES</ul>
                <ul className="navbar-ul" onClick={showAlert}>SUPPORT</ul>
                <ul className="navbar-ul" onClick={showAlert}>ABOUT</ul>
            </ul>
            <NavLink to='/login'>
                <button className="navbar-login-button">LOG IN</button>
            </NavLink>
            <button onClick={handleLogout}>LOG OUT</button>
        </div>
    )
}

export default NavBar;
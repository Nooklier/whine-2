import { NavLink, useLocation, useParams } from "react-router-dom";
import logo from "../../../photos/logo.png"
import "./NavBar.css"

function NavBar() {
    const location = useLocation()
    const { shiftId } = useParams();
    const hiddenPaths = ['/login', '/signup', '/dashboard', '/shift', `/shift/${shiftId}`,];


    if (hiddenPaths.includes(location.pathname)) {
        return null;
    }

    function showAlert() {
        alert('Feature coming soon!')
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
        </div>
    )
}

export default NavBar;
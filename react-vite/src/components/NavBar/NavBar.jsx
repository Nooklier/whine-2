import { NavLink } from "react-router-dom";
import logo from "../../../photos/logo.png"
import "./NavBar.css"

function NavBar() {

    function showAlert(event) {
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
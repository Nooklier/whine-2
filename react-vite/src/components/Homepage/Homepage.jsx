import { NavLink } from "react-router-dom";
import logo from "../../../photos/large-logo.png"
import signUpButton from "../../../photos/sign-up-button.png"
import "./Homepage.css"


function Homepage() {

    return (
        <div className="homepage-container">
            <img className='homepage-logo' src={logo} alt="website logo"/>
            <div className="homepage-description">Workforce Harmonization & Integrated Networking Engine</div>
            <NavLink to="/signup">
                <img className='homepage-signup-button' src={signUpButton} alt="sign up button"></img>
            </NavLink>
        </div>
    )
}

export default Homepage;
import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import logo from "../../../photos/logo.png"
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password)

    const serverResponse = await dispatch(
      thunkLogin({
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/dashboard");
    }
  };
  
  const handleDemoUser = () => {
    setUsername("janesmith");
    setPassword("password2");
  };

  
  return (
    <div className="login-container">
      <NavLink to='/' className="login-left">
        <img className='logo' src={logo} alt="website logo"/>
      </NavLink>

      <div className="login-right-container">
        <h1>Log In</h1>
        
        <form onSubmit={handleSubmit}>

          <div className="form-container">
            <div>Username</div>
            <label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            </label>
            <div>Password</div>
            <label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>
          </div>


          <div>
            {errors.length > 0 && errors.map((message) => <p key={message}>{message}</p>)}
            {errors.username && <p>{errors.username}</p>}
            {errors.password && <p>{errors.password}</p>}
          </div>

          <div className="buttons-container">
            <button className='demo-user-button' type="button" onClick={handleDemoUser}>Demo User</button>
            <button className='login-button' type="submit">Log In</button>
          </div>

        </form>
 
      </div>

    </div>
  );
}

export default LoginFormPage;

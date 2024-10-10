import React , {useState} from "react";
import './login.css'
import assets  from "../../assets/assets";


const Login = () => {

    const [ currState,setCurrState] = useState('Sign up');
    return(
        <div className="login">
            <img src={assets.logo_big} alt=" logo image"  className="logo"/>
            <form className="login-form">
                <h2>{currState}</h2>
                {currState === "Sign up" ?<input type="text" className="forminput" placeholder="Username" required/>:null}
                <input type="Email" className="forminput" placeholder="Email address" required/>
                <input type="password" className="forminput" placeholder="Password" required
                />
                <button type="submit">{currState === "Sign up"?"Create Account":"Login Now"}</button>
                <div className="login-term">
                    <input type="checkbox"/>
                    <p>Agree to the ters of use & privacy policy.</p>
                </div>
                <div className="login-forgot">
                    {currState === "Sign up" ? <p className="login-toggle"> Already have an account <spam onClick ={()=>setCurrState("Login")} >Login here.</spam></p>
                    : <p className="login-toggle"> Create an account <spam onClick ={()=>setCurrState("Sign up")} >click here .</spam></p>}
                    
                </div>
            </form>
        </div>
    )
}

export default Login;
import React , {useState} from "react";
import './login.css'
import assets  from "../../assets/assets";
import { signup,login } from "../../config/firebase";

const Login = () => {

    const [ currState,setCurrState] = useState('Sign up');
    const [userName , setUserName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if(currState === "Sign up"){
            signup(userName, email, password);
        }
        else{
            login(email, password);
        }
    }

    return(
        <div className="login">
            <img src={assets.logo_big} alt=" logo image"  className="logo"/>
            <form className="login-form" onSubmit={onSubmitHandler}>
                <h2>{currState}</h2>
                {currState === "Sign up" ?<input  onChange={ (e)=>setUserName(e.target.value)} value={userName} type="text" className="forminput" placeholder="Username" required/>:null}
                <input onChange={ (e)=>setEmail(e.target.value)} value={email} type="Email" className="forminput" placeholder="Email address" required/>
                <input onChange={ (e)=>setPassword(e.target.value)} value={password} type="password" className="forminput" placeholder="Password" required/>
                <button type="submit">{currState === "Sign up"?"Create Account":"Login Now"}</button>
                <div className="login-term">
                    <input type="checkbox"/>
                    <p>Agree to the terms of use & privacy policy.</p>
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
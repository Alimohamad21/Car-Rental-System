import axios from "axios";
import React, {useState} from "react";



function Login() {
    const [emailInput,setEmail] = useState([]);
    const [passwordInput,setPassword] = useState([]);

    const login = () => {
        axios.post("http://localhost:3001/login" , {
            email: emailInput,
            password: passwordInput
        }).then((response)=>{
            console.log(response);
        })};
    return (
        <div className='login'>
            <h1>Login</h1>
            <label>Email</label>
            <input type='text' onChange={(event)=>{
                setEmail(event.target.value);
            }}/>
            <label>Password</label>
            <input type='password' onChange={(event)=>{
                setPassword(event.target.value);
            }}/>
            <button onClick={login}>Login</button>
        </div>
    );
}

export default Login;
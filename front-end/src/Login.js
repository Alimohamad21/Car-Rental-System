import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router";


function Login() {
    const [emailInput, setEmail] = useState([]);
    const [passwordInput, setPassword] = useState([]);
    let [error, setError] = useState([]);
    const navigate = useNavigate();

    const login = async () => {
        if (emailInput == '') {
            setError('Please enter your email')
        } else if (passwordInput == '') {
            setError('Please enter a password')
        } else {
            await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailInput,
                    password: passwordInput
                }),
            }).then(res => {
                if (res.ok) {
                    console.log()
                    return res.json();
                } else
                    throw Error(res.status);
            }).then(result => {
                const status = result.data;
                console.log(`status is ${result.data}`)
                if (status === 'success')
                    navigate('/');
                else {
                    setError(status);
                    console.log(error);
                }
            }).catch(e => {
                console.log('ERROR 1: ', e);
            })
        }
    }
    return (
        <div className='login'>
            <h1>Login</h1>
            <label>Email</label>
            <input type='email' onChange={(event) => {
                setEmail(event.target.value);
            }}/>
            <label>Password</label>
            <input type='password' onChange={(event) => {
                setPassword(event.target.value);
            }}/>
            <button onClick={login}>Login</button>
            <div>{error}</div>
        </div>
    );
}

export default Login;

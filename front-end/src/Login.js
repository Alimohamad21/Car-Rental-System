import React, {useState} from "react";
import {useNavigate} from "react-router";


function Login() {
    const [accountInput, setAccount] = useState('');
    const [passwordInput, setPassword] = useState('');
    let [error, setError] = useState('');
    const navigate = useNavigate();
    const login = async () => {
        if (accountInput === '') {
            setError('Please enter email or username')
        } else if (passwordInput === '') {
            setError('Please enter a password')
        } else {
            fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    account: accountInput,
                    password: passwordInput
                }),
            }).then(res => {
                if (res.ok) {
                    console.log()
                    return res.json();
                } else
                    throw Error(res.status);
            }).then(  result => {
                const status = result.data;
                const isAdmin = result.admin;
                console.log(`status is ${result.data}`)
                if (status === 'success') {
                    console.log(`admin is ${isAdmin}`)
                    if (isAdmin)
                        navigate('/adminHome',{state:{'auth':true}})
                    else {
                        navigate('/reservation',{state:{'username':result.username}})
                    }
                } else {
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
            <label>Please enter email or username</label>
            <input type='email' onChange={(event) => {
                setAccount(event.target.value);
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

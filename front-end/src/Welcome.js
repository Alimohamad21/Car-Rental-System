import React from "react";
import { useNavigate } from 'react-router-dom';

function Welcome() {
    const navigate = useNavigate();
    const login = () => {
        navigate('/login');
    }
    const signup = () => {
        navigate('/signup');
    }
    return (
        <div className="welcome">
            <h1>Welcome To Car Rental System</h1>
            <button onClick={login}>Log In</button>
            <button onClick={signup}>Sign Up</button>
        </div>
    );
}

export default Welcome;
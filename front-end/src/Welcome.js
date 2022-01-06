import React from "react";
import { useNavigate } from 'react-router-dom';

function Welcome() {
    const navigate = useNavigate();
    const start = () => {
        navigate('/login');
    }
    return (
        <div className="Welcome">
            <h1>Welcome To Car Rental System</h1>
            <button onClick={start}>Start</button>
        </div>
    );
}

export default Welcome;
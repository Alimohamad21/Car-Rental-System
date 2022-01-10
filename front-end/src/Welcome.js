import React from "react";
import { useNavigate } from 'react-router-dom';
import {Card} from "react-bootstrap";

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
            <button className='big-button' onClick={login}>Log In</button>
            <button className='big-button' onClick={signup}>Sign Up</button>
            <Card style={{ width: '118rem',height:'118rem' }}>
                <Card.Img variant="top" src='https://www.teslarati.com/wp-content/uploads/2018/08/tesla-roadster-matte-black-1-e1534872442960.jpeg'/>
                <Card.Body>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Welcome;

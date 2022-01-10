import React from "react";
import {useLocation, useNavigate} from "react-router";
import {Button} from "react-bootstrap";
import NewReservation from "./NewReservation";
import Welcome from "./Welcome";
import './index.css';


function Confirmation() {
    const {state} = useLocation();
    const {username,confirmationMessage}=state;
    const navigate = useNavigate();

    const goToNewReservation = () => {
        navigate('/reservation',{state:{'username':username}})
    }
    const Logout = () => {
        navigate('/')
    }
    return (
        <div className="confirmation">
            <h1>{confirmationMessage}</h1>
            <Button variant="primary" onClick={goToNewReservation}>New Reservation</Button>
            <Button variant="primary" onClick={Logout}>Logout</Button>
        </div>
    );
}

export default Confirmation;

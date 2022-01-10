import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import CustomerNavbar from "./CustomerNavbar";
import NewReservation from "./NewReservation";
import CarsSelection from "./CarsSelection";
import Payment from "./Payment";
import CustomerReservations from "./CustomerReservations";
import './index.css';

function CustomerHome() {
    // const {state} = useLocation();
    // const {username} = state;
    const username = "adham";
    return (
            <div className="home">
                <h1>Customer Home!</h1>
                <CustomerNavbar/>
                <div className="customer-pages">

                </div>
            </div>
    );
}

export default CustomerHome;



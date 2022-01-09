import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import CustomerNavbar from "./CustomerNavbar";
import NewReservation from "./NewReservation";
import {Route, Routes} from "react-router-dom";
import Welcome from "./Welcome";
import SignUp from "./SignUp";
import Login from "./Login";
import AdminHome from "./AdminHome";
import CarsSelection from "./CarsSelection";

function CustomerHome() {
    return (
        <div className="home">
            <CustomerNavbar/>
            <NewReservation/>
        </div>
    );
}

export default CustomerHome;
// <Routes>
//     <Route exact path="/" element={<NewReservation/>}/>
//     <Route exact path="/carSelect" element={<CarsSelection/>}/>
// </Routes>


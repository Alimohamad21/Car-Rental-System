import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import CustomerNavbar from "./CustomerNavbar";
import NewReservation from "./NewReservation";

function CustomerHome() {
    return (
        <div className="home">
            <CustomerNavbar/>
            <NewReservation/>
        </div>
    );
}

export default CustomerHome;



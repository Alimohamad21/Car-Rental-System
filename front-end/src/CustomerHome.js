import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import CustomerNavbar from "./CustomerNavbar";
import NewReservation from "./NewReservation";
import {useLocation} from "react-router";

function CustomerHome() {
    // const {state} = useLocation();
    // const {username} = state;

    return (
        <div className="home">
            <CustomerNavbar />
            <NewReservation/>
        </div>
    );
}

export default CustomerHome;
// <Routes>
//     <Route exact path="/" element={<NewReservation/>}/>
//     <Route exact path="/carSelect" element={<CarsSelection/>}/>
// </Routes>


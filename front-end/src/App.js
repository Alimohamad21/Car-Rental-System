import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Welcome from "./Welcome";
import SignUp from "./SignUp";
import Login from "./Login";
import AdminHome from "./AdminHome";
import NewReservation from "./NewReservation";
import CarsSelection from './CarsSelection';
import Payment from "./Payment";
import CustomerReservations from "./CustomerReservations";
import CustomerHome from "./CustomerHome";
import Reservations from "./Reservations";
import EditCars from "./EditCars";
import AddCar from "./AddCar";
import Confirmation from "./Confirmations";
import './index.css';

function App() {
    return (
        <Router>
            <div className="app">
                <div className="content">
                    <Routes>
                        <Route exact path="/" element={<Welcome/>}/>
                        <Route exact path="/signup" element={<SignUp/>}/>
                        <Route exact path="/login" element={<Login/>}/>
                        <Route exact path="/adminHome" element={<AdminHome/>}/>
                        <Route exact path="/reservations" element={<Reservations/>}/>
                        <Route exact path="/editCars" element={<EditCars/>}/>
                        <Route exact path="/addCars" element={<AddCar/>}/>
                        <Route exact path="/customerHome" element={<CustomerHome/>}/>
                        <Route exact path="/reservation" element={<NewReservation/>}/>
                        <Route exact path="/customerReservations" element={<CustomerReservations/>}/>
                        <Route exact path="/carSelect" element={<CarsSelection/>}/>
                        <Route exact path="/payment" element={<Payment/>}/>
                        <Route exact path="/confirmation" element={<Confirmation/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Welcome from "./Welcome";
import SignUp from "./SignUp";
import Login from "./Login";
import AdminHome from "./AdminHome";
import NewReservation from "./NewReservation";
import CarsSelection from './CarsSelection';
import Payment from "./Payment";
import Reservations from "./Reservations";
import CustomerHome from "./CustomerHome";

function App() {
    return (
        <Router>
            <div className="app">
                <div className="content">
                    <Routes>
                        <Route exact path="/" element={<Welcome/>}/>
                        <Route exact path="/signup" element={<SignUp/>}/>
                        <Route exact path="/login" element={<Login/>}/>
                        <Route exact path="/reservation" element={<NewReservation/>}/>
                        <Route exact path="/adminHome" element={<AdminHome/>}/>
                        <Route exact path="/carSelect" element={<CarsSelection/>}/>
                        <Route exact path="/payment" element={<Payment/>}/>
                        <Route exact path="/reservations" element={<Reservations/>}/>
                        <Route exact path="/customerHome" element={<CustomerHome/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;



{/*<Route exact path="/" element={<Welcome/>}/>*/}
{/*<Route exact path="/signup" element={<SignUp/>}/>*/}
{/*<Route exact path="/login" element={<Login/>}/>*/}
{/*<Route exact path="/customer/*" element={<CustomerHome/>}/>*/}
{/*<Route exact path="/adminHome" element={<AdminHome/>}/>*/}
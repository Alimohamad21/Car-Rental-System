import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Welcome from "./Welcome";
import SignUp from "./SignUp";
import Login from "./Login";
import AdminHome from "./AdminHome";
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
                        <Route exact path="/customer" element={<CustomerHome/>}/>
                        <Route exact path="/adminHome" element={<AdminHome/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

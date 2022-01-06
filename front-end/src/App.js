import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Welcome from "./Welcome";
import SignUp from "./SignUp";
import Login from "./Login";


function App() {
    const start = () => {

    }
    return (
        <Router>
            <div className="App">
                <div className="content">
                    <Routes>
                        <Route exact path="/" element={<Welcome/>}/>
                        <Route exact path="/signup" element={<SignUp/>}/>
                        <Route exact path="/login" element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
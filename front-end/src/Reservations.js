import React, {useEffect} from "react";
import {useLocation} from "react-router";


function Reservations() {
    const {state} = useLocation();
    const {username} = state;

    useEffect(() => {
        fetch("http://localhost:3001/cars", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }, body: JSON.stringify({
                username : username
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else
                throw Error(res.status);
        }).then().catch(e => {
            console.log('ERROR 1: ', e);
        })
    }, [])

    return (
        <div className='reservations'>
            <h1>Reservations</h1>
        </div>
    );
}

export default Reservations;
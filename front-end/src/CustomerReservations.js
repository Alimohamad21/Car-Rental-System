import React, {useEffect, useState} from "react";
import {useLocation} from "react-router";


function CustomerReservations() {
    const [number,setNumber] = useState([]);
    const [carBrand,setCarBrand] = useState(null);
    const [carModel,setCarModel] = useState(null);
    const [carEngine,setCarEngine] = useState(null);
    const [carColor,setCarColor] = useState(null);
    const [carPrice,setCarPrice] = useState(null);
    const {state} = useLocation();
    const {username} = state;

    useEffect(() => {
        fetch("http://localhost:3001/reservations", {
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

export default CustomerReservations;
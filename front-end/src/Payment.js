import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import {useNavigate} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

function Payment() {
    const [locations, setLocations] = useState([]);
    const [pickupLocation, setPickupLocation] = useState("default");
    const [returnLocation, setReturnLocation] = useState("default");
    const [pickupDate, setPickupDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(pickupDate);
    let [error, setError] = useState('');
    const navigate = useNavigate();

    const Reserve = () => {
        fetch("http://localhost:3001/cars/reserve", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }, body: JSON.stringify({

            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else
                throw Error(res.status);
        }).then((data) => { setCars(data) }
        ).catch(e => {
            console.log('ERROR 1: ', e);
        })
    }

    return (
        <div className="receipt">

        </div>
    );
}

export default Payment;



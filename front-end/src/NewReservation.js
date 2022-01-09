import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import {useNavigate} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

function NewReservation() {
    const [locations, setLocations] = useState([]);
    const [pickupLocation, setPickupLocation] = useState("default");
    const [returnLocation, setReturnLocation] = useState("default");
    const [pickupDate, setPickupDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(pickupDate);
    let [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3001/locations", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else
                throw Error(res.status);
        }).then(offices => {
            setLocations(offices.map((office) => office.location))
        }).catch(e => {
            console.log('ERROR 1: ', e);
        })
    }, [])

    const goToCarsList = () => {
        if (pickupLocation === 'default' || returnLocation === 'default')
            setError('Please Choose location');
        else
            navigate('/',{
                pickupLocation: pickupLocation,
                returnLocation: returnLocation,
                pickupDate: pickupDate,
                returnDate: returnDate
            });
    };

    return (
        <div className="new-reservation">
            <select
                id="pickup-office"
                className="mt-2"
                onChange={e => setPickupLocation(e.target.value)}
            >
                <option selected disabled hidden>Pickup Location</option>
                {locations.map((item, key) =>
                    <option
                        key={key}> {item}
                    </option>
                )}
            </select>
            <select
                id="return-office"
                className="mt-2"
                onChange={e => setReturnLocation(e.target.value)}
            >
                <option selected disabled hidden>Return Location</option>
                {locations.map((item) =>
                    <option key={item}>{item}</option>
                )}
            </select>
            <DatePicker
                selected={pickupDate}

                onChange={pickupDate => {
                    setPickupDate(pickupDate)
                    setReturnDate(pickupDate)
                }}

                minDate={new Date()}
                showDisabledMonthNavigation
            />

            <DatePicker
                selected={returnDate}
                onChange={returnDate => setReturnDate(returnDate)}
                minDate={pickupDate}
                showDisabledMonthNavigation
                // isClearable={true}
            />
            <div>{error}</div>
            <button onClick={goToCarsList}>Reserve</button>
        </div>
    );
}

export default NewReservation;



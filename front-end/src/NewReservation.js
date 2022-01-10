import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import {useNavigate} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import le from "react-datepicker";
import {useLocation} from "react-router";

function NewReservation() {
    const [locations, setLocations] = useState([]);
    const [number, setNumber] = useState([]);
    const [pickupLocation, setPickupLocation] = useState("default");
    const [returnLocation, setReturnLocation] = useState("default");
    const [returnName, setReturnName] = useState("default");
    const [pickupName, setPickupName] = useState("default");
    const [pickupDate, setPickupDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(pickupDate);
    let [error, setError] = useState('');
     const {state} = useLocation();
     const username = state.username;
    const navigate = useNavigate();

    useEffect(() => {
        console.log(username)
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
            setNumber(offices.map((office) => office.number))
        }).catch(e => {
            console.log('ERROR 1: ', e);
        })
    }, [])

    const goToCarsList = () => {
        if (pickupLocation === 'default' || returnLocation === 'default')
            setError('Please Choose location');
        else
            navigate('/carSelect',{state:{
                    'pickupDate':pickupDate,
                    'pickupLocation':pickupLocation,
                    'returnDate': returnDate,
                    'returnLocation':returnLocation,
                    'pickupName':pickupName,
                    'returnName':returnName,
                    'username':username
                }});
    };
    const pickupData = (key) => {
        setPickupLocation(number[key]);
        setPickupName(locations[key]);
    }
    const returnData = (key) => {
        setReturnLocation(number[key]);
        setReturnName(locations[key]);
    }
    return state==null?'unauthorized':(
        <div className="new-reservation">
            <select
                id="pickup-office"
                className="mt-2"
                onChange={e => pickupData(e.target.value)}
            >
                <option selected disabled hidden>Pickup Location</option>
                {locations.map((item, key) =>
                    <option
                        value={key}> {item}
                    </option>
                )}
            </select>
            <select
                id="return-office"
                className="mt-2"
                onChange={e => returnData(e.target.value)}
            >
                <option selected disabled hidden>Return Location</option>
                {locations.map((item,key) =>
                    <option value={key}>{item}</option>
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

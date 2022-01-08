import React, {useEffect, useState} from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";

function CustomerHome() {
    let [locations, setLocations] = useState([]);
    // useEffect( async () => {
    //     await fetch("http://localhost:3001/locations", {
    //         method: "GET",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //         },
    //     }).then(res => {
    //         if (res.ok) {
    //             return res.json();
    //         } else
    //             throw Error(res.status);
    //     }).catch(e => {
    //         console.log('ERROR 1: ', e);
    //     })
    // },[locations]);
    // console.log(locations);

    useEffect( ()=>{
        console.log(`$BEFORE`)
        console.log(locations)
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
            setLocations(offices.map((office)=>office.location));
        }).catch(e => {
            console.log('ERROR 1: ', e);
        })
        console.log(`$AFTER`)
        console.log(locations)
    },[locations])


    return (
        <div className="home">
            <h1>Welcome Home Customer!</h1>
            <div className="new-reservation">
                <DropdownButton
                    id="pickup-office"
                    variant="secondary"
                    menuVariant="dark"
                    title="Pick Up Location"
                    className="mt-2">
                    {locations.map((item) =>
                        <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
                    )}
                    <Dropdown.Divider/>
                    <Dropdown.Item href="#/offices">All Offices</Dropdown.Item>
                </DropdownButton>
                <DropdownButton
                    id="return-office"
                    variant="secondary"
                    menuVariant="dark"
                    title="Return Location"
                    className="mt-2">
                    {locations.map((item) =>
                        <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
                    )}
                    <Dropdown.Divider/>
                    <Dropdown.Item href="#/offices">All Offices</Dropdown.Item>
                </DropdownButton>
            </div>
        </div>
    );
}

export default CustomerHome;
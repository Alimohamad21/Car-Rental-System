import React, {useState} from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";
import {useLocation} from "react-router";

function CustomerHome() {
    const {state} = useLocation()
    const {locations} = state;

    return (
        <div className="home">
            <h1>Welcome Home Customer!</h1>
            <div className="new-reservation">
                <DropdownButton
                    id="pickup-office"
                    variant="secondary"
                    menuVariant="dark"
                    title="Pick Up Location"
                    className="mt-2"
                >
                    {locations.map((item) =>
                        <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
                    )}
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/offices">All Offices</Dropdown.Item>
                </DropdownButton>


                <DropdownButton
                    id="return-office"
                    variant="secondary"
                    menuVariant="dark"
                    title="Return Location"
                    className="mt-2"
                >
                    {locations.map((item) =>
                        <Dropdown.Item eventKey={item}>{item}</Dropdown.Item>
                    )}
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/offices">All Offices</Dropdown.Item>
                </DropdownButton>
            </div>
        </div>
    );
}

export default CustomerHome;
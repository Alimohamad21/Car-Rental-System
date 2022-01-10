import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {Navbar, Container, NavDropdown, Nav} from 'react-bootstrap';
import {CSVLink} from "react-csv";
import Button from "bootstrap/js/src/button";
import './index.css';

function Reservations() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const [username, setUsername] = useState('');
    const [carPlate, setCarPlate] = useState('');
    const [reservationNo, setReservationNo] = useState('');
    const [reservationTime, setReservationTime] = useState('');
    const [pickUpTime, setPickUpTime] = useState('');
    const [returnTime, setReturnTime] = useState('');
    const [returnOffice, setReturnOffice] = useState('');
    const [payment, setPayment] = useState('');
    const [noResults, setNoResults] = useState('');

    const toDisplayDate = (date) => {
        date = date.replace('T', ' ')
        date = date.replace('Z', '')
        return date;
    }
    const homeNavigator = () => {
        navigate('/adminHome', {state: {'auth': true}})
    }
    const carsNavigator = () => {
        navigate('/editCars', {state: {'auth': true}})
    }
    const addCarNavigator = () => {
        navigate('/addCars', {state: {'auth': true}})
    }
    const viewAllReservations = () => {
        fetch("http://localhost:3001/adminReservations", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else
                throw Error(res.status);
        }).then(reservationList => {
            if (reservationList.length === 0)
                setNoResults('No results')
            else
                setNoResults('')
            setReservations(reservationList)
        }).catch(e => {
            console.log('ERROR 1: ', e);
        })
        console.log(`$AFTER`)
    }
    const reservationsAdvancedSearch = () => {
        fetch("http://localhost:3001/adminReservations", {
            method: "POST",
            body: JSON.stringify({
                "reservationNo": reservationNo,
                "username": username,
                "carPlate": carPlate,
                "reservationTime": reservationTime,
                "pickUpTime": pickUpTime,
                "returnTime": returnTime,
                "returnOffice": returnOffice,
                "payment": payment
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else
                throw Error(res.status);
        }).then(reservationList => {
            if (reservationList.length === 0)
                setNoResults('No results')
            else
                setNoResults('')
            setReservations(reservationList)
        }).catch(e => {
            console.log('ERROR 1: ', e);
        })
        console.log(`$AFTER`)
    }
    return state === null ? 'unauthorized' : (
        <div className="Home">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand onClick={homeNavigator} href="/adminHome">Admin Portal</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="" color="red">Reservations</Nav.Link>
                            <Nav.Link onClick={carsNavigator}>Edit Cars</Nav.Link>
                            <Nav.Link onClick={addCarNavigator}>Add Car</Nav.Link>
                        </Nav>
                        <Nav className="float-end">
                            <Nav.Link href="/login">Log out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="search">
                <h1>Advanced Search</h1>
                <div>
                    <label>Reservation number: </label>
                    <input type='text' onChange={(event) => {
                        setReservationNo(event.target.value);
                    }}
                    />
                </div>
                <div>
                    <label>Username: </label>
                    <input type='text' onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                    />
                </div>
                <div>
                    <label>Car Plate: </label>
                    <input type='text' onChange={(event) => {
                        setCarPlate(event.target.value);
                    }}
                    />
                </div>
                <div>
                    <label>Reservation Time: </label>
                    <input type='text' onChange={(event) => {
                        setReservationTime(event.target.value);
                    }}
                    />
                </div>
                <div>
                    <label>Pick up time: </label>
                    <input type='text' onChange={(event) => {
                        setPickUpTime(event.target.value);
                    }}
                    />
                </div>
                <div>
                    <label>Return Time: </label>
                    <input type='text' onChange={(event) => {
                        setReturnTime(event.target.value);
                    }}
                    />
                </div>
                <div>
                    <label>Return Office: </label>
                    <input type='text' onChange={(event) => {
                        setReturnOffice(event.target.value);
                    }}
                    />
                </div>
                <div>
                    <label>Payment: </label>
                    <input type='text' onChange={(event) => {
                        setPayment(event.target.value);
                    }}
                    />
                </div>
            </div>
            <button onClick={reservationsAdvancedSearch}>Search</button>
            <button onClick={viewAllReservations}>View All Reservations</button>
            <div>{noResults}</div>
            {
                reservations.map((reservation, key) => {
                        return (
                            <div>
                                <img src={reservation.image_url}/>
                                <div>{`Reservation Number: ${reservation.reservation_number}`}</div>
                                <div>{`Username: ${reservation.username}`}</div>
                                <div>{`Car plate: ${reservation.car_plate}`}</div>
                                <div>{`Reservation time: ${toDisplayDate(reservation.reservation_time)}`}</div>
                                <div>{`Pick up time: ${toDisplayDate(reservation.pickup_time)}`}</div>
                                <div>{`Return time: ${toDisplayDate(reservation.return_time)}`}</div>
                                <div>{`Return office: ${reservation.return_office}`}</div>
                                <div>{`Payment Method: ${reservation.payment}`}</div>
                                <div>{`Reserver Full Name: ${reservation.first_name} ${reservation.last_name}`}</div>
                                <br/>
                                <br/>
                                <br/>
                            </div>
                        );
                    }
                )
            }
            {reservations.length > 0 ? <CSVLink
                filename='report.csv'
                data={reservations}
                onClick={() => {
                    console.log("You downloaded the report");
                }}
            >
                <button className="extractReport" type="button">Extract Report</button>
            </CSVLink> : <div/>}
        </div>


    );
}

export default Reservations;

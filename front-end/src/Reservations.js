import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {Navbar, Container, NavDropdown, Nav} from 'react-bootstrap';

function Reservations() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const toDisplayDate=(date)=>{
        date=date.replace('T',' ')
        date=date.replace('Z','')
        return date;
    }
    const homeNavigator = () => {
        navigate('/adminHome', {state: {'auth': true}})
    }
    const carsNavigator = () => {
        navigate('/editCars', {state: {'auth': true}})
    }
    const addCarNavigator=()=>{
        navigate('/addCars',{state:{'auth':true}})
    }
    useEffect(() => {
        fetch("http://localhost:3001/reservations", {
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
        }).then(reservationList => {
            setReservations(reservationList)
        }).catch(e => {
            console.log('ERROR 1: ', e);
        })
        console.log(`$AFTER`)
    }, [])
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
            {
                reservations.map((reservation,key) => {
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
                                <br/>
                                <br/>
                                <br/>
                            </div>
                        );

                    }
                )
            }
        </div>

    );
}

export default Reservations;

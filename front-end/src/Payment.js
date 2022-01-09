import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Card, Button, ListGroup} from "react-bootstrap";
import {useLocation} from "react-router";


 function Payment() {
     const {state} = useLocation();
     const {pickupDate,pickupName,returnDate,returnName,car}=state;
     const navigate = useNavigate();
     let days = (returnDate.getTime() - pickupDate.getTime()) /  (1000 * 3600 * 24);
     let totalCost = car.rent_price * days;

//     const Reserve = () => {
//         fetch("http://localhost:3001/cars/reserve", {
//             method: "POST",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//             }, body: JSON.stringify({
//
//             })
//         }).then(res => {
//             if (res.ok) {
//                 return res.json();
//             } else
//                 throw Error(res.status);
//         }).then((data) => { setCars(data) }
//         ).catch(e => {
//             console.log('ERROR 1: ', e);
//         })
//     }

    return (
        <div className="receipt">
            <Card className="text-center">
                <Card.Header>Reservation Receipt</Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Pickup Location: {pickupName}</ListGroup.Item>
                        <ListGroup.Item>Pickup Date: {pickupDate.toDateString()}</ListGroup.Item>
                        <ListGroup.Item>Return Location: {returnName}</ListGroup.Item>
                        <ListGroup.Item>Return Date: {returnDate.toDateString()}</ListGroup.Item>
                        <ListGroup.Item>Brand: {car.brand}</ListGroup.Item>
                        <ListGroup.Item>Model: {car.model}</ListGroup.Item>
                        <ListGroup.Item>Engine: {car.engine}</ListGroup.Item>
                        <ListGroup.Item>Color: {car.colour}</ListGroup.Item>
                        <ListGroup.Item>Total Cost: {totalCost.toFixed()}$</ListGroup.Item>
                    </ListGroup>
                    <Button variant="primary">Continue to Payment</Button>
                    <Button variant="primary">Reserve</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Payment;



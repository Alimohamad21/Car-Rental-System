import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Card, Button, ListGroup} from "react-bootstrap";
import {useLocation} from "react-router";

 function Payment() {
     const {state} = useLocation();
     const {pickupDate,pickupLocation,returnDate,returnLocation,car}=state;
     const navigate = useNavigate();


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
                        <ListGroup.Item>Pickup Location: {pickupLocation}</ListGroup.Item>
                        {/*<ListGroup.Item>Pickup Date: {pickupDate}</ListGroup.Item>*/}
                        <ListGroup.Item>Return Location: {returnLocation}</ListGroup.Item>
                        {/*<ListGroup.Item>Return Date: {returnDate}</ListGroup.Item>*/}
                        <ListGroup.Item>Car Brand: {car.brand}</ListGroup.Item>
                        <ListGroup.Item>Car Model: {car.model}</ListGroup.Item>
                        <ListGroup.Item>Car Brand: {car.brand}</ListGroup.Item>
                        <ListGroup.Item>Car Brand: {car.brand}</ListGroup.Item>
                        <ListGroup.Item>Car Brand: {car.brand}</ListGroup.Item>
                    </ListGroup>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
        </div>
    );
}

export default Payment;



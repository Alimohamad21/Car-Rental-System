import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Card, Button, ListGroup, Form} from "react-bootstrap";
import {useLocation} from "react-router";
import moment from "moment";

function Payment() {
    const [payment, setPayment] = useState("default");
    let [error, setError] = useState('');
    const {state} = useLocation();
    const {pickupDate, pickupName, returnDate, returnName, returnLocation, username, car} = state;
    const navigate = useNavigate();
    let days = (returnDate.getTime() - pickupDate.getTime()) / (1000 * 3600 * 24);
    let totalCost = car.rent_price * days;

    const Reservation = () => {
        if (payment === 'default')
            setError('Please Choose Payment Type');
        else {
            fetch("http://localhost:3001/confirm", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }, body: JSON.stringify({
                    username: username,
                    car_plate: car.plate,
                    pickup_time: moment(pickupDate).format('YYYY-MM-DD'),
                    return_time: moment(returnDate).format('YYYY-MM-DD'),
                    return_office: returnLocation,
                    payment: payment
                })
            }).then(res => {
                if (res.ok) {
                    return res.json();
                } else
                    throw Error(res.status);
            }).then((data) => {
                    if(data.error!=null)
                   setError(data.error)
                else
                    setError(`Reserved car ${car.brand} ${car.model} for ${moment(pickupDate).format('YYYY-MM-DD')} successfully`)
                }
            ).catch(e => {
                console.log('ERROR 1: ', e);
            })
        }
    }

    return (
        <div className="receipt" style={{width: "20em"}}>
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
                    <label>Payment Method </label>
                    <Form.Check
                        type='radio'
                        label='Pay On Pickup'
                        id='1'
                        name='option'
                        // defaultChecked={true}
                        onClick={
                            event => {
                                setPayment("pay on pickup")
                            }
                        }
                    />
                    <Form.Check
                        type='radio'
                        label='Pay Now'
                        id='2'
                        name='option'
                        onClick={
                            event => {
                                setPayment("paid")
                            }
                        }
                    />
                    <div>{error}</div>
                    <br/>
                    <Button variant="primary" onClick={Reservation}>Reserve</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Payment;

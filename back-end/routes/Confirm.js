const express = require('express')
const router = express.Router()
const db = require('../database');

router.post("/", (async (req, res) => {
    const username = req.body.username;
    const car_plate = req.body.car_plate;
    const pickup_time = req.body.pickup_time;
    const return_time = req.body.return_time;
    const return_office = req.body.return_office;
    const payment = req.body.payment;
    db.query(`INSERT INTO reservation (username, car_plate, pickup_time, return_time, return_office, payment, reservation_time) VALUES (?,?,?,?,?,?,CURRENT_TIMESTAMP() )`,
        [username, car_plate, pickup_time, return_time, return_office, payment],
        async (error) => {
            res.json({error});
        });
}));

module.exports = router;
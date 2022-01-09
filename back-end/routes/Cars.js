const express = require('express')
const router = express.Router()
const db = require('../database');

router.get("/", (async (req, res) => {
    const pickup_time = '2022-01-10';
    const pickup_office = 1;
    db.query(`SELECT c.* FROM reservation r
                  JOIN (SELECT car_plate,MAX(return_time) time FROM reservation GROUP BY car_plate) x
                  ON x.car_plate = r.car_plate AND x.time = r.return_time
                  RIGHT JOIN car c ON c.plate = r.car_plate
                  WHERE c.status = 'Active'
                  AND (return_time < ? OR r.return_time IS NULL)
                  AND (return_office = ? OR (r.return_office IS NULL AND current_office = ?))`,
        [pickup_time,pickup_office,pickup_office],
        async (error, rows) => {
            if (rows.length > 0) {
                res.json(rows);
            }
        });
}));

router.post("/", (async (req, res) => {
    // const username = ['adham'];
    // const car_plate = ['ABC115'];
    // const pickup_time = ['2022-02-01'];
    // const return_time = ['2022-02-03'];
    // const return_office = [1];
    // const payment = ['Paid'];
    const username = [];
    const car_plate = [];
    const pickup_time = [];
    const return_time = [];
    const return_office = [];
    const payment = [];
    db.query(`INSERT INTO reservation (username, car_plate, pickup_time, return_time, return_office, payment) VALUES (?,?,?,?,?,?)`,
        [username, car_plate, pickup_time, return_time, return_office, payment],
        async (error) => {
            res.json({error});
        });
}));

module.exports = router;
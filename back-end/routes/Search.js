const express = require('express')
const router = express.Router()
const db = require('../database');

router.post("/", (async (req, res) => {
    const pickup_time = req.body.pickupDate;
    const pickup_office = req.body.pickupLocation;
    const brand = req.body.carBrand;
    const model = req.body.carModel;
    const engine = req.body.carEngine;
    const colour = req.body.carColour;
    const price = req.body.carPrice;
    // let advancedSearch = false;
    let conditions = '';
    let valueList = [pickup_time,pickup_office,pickup_office];
    if(brand!=='' &&  brand!=null)
    {
        // if(!advancedSearch) {
        //     advancedSearch = true;
        //     conditions+=' WHERE brand = ? '
        // }
        conditions+=' AND c.brand = ? '
        valueList.push(brand)
    }
    if(model!=='' &&  model!=null)
    {
        // if(!advancedSearch) {
        //     advancedSearch = true;
        //     conditions+=' WHERE model = ? '
        // }
        // else {
        //     conditions+=' AND model = ? '
        // }
        conditions+=' AND c.model = ? '
        valueList.push(model)
    }
    if(engine!=='' &&  engine!=null)
    {
        // if(!advancedSearch) {
        //     advancedSearch = true;
        //     conditions+=' WHERE engine = ? '
        // } else {
        //     conditions+=' AND engine = ? '
        // }
        conditions+=' AND c.engine = ? '
        valueList.push(engine)
    }
    if(colour!=='' &&  colour!=null)
    {
        // if(!advancedSearch) {
        //     advancedSearch = true;
        //     conditions+=' WHERE colour = ? '
        // } else {
        //     conditions+=' AND colour = ? '
        // }
        conditions+=' AND c.colour = ? '
        valueList.push(colour)
    }
    if(price!=='' &&  price!=null)
    {
        // if(!advancedSearch) {
        //     conditions+=' WHERE rent_price < ? '
        // } else {
        //     conditions+=' AND rent_price <= ? '
        // }
        conditions+=' AND c.rent_price <= ? '
        valueList.push(parseInt(price))
    }
    db.query(`SELECT c.* FROM reservation r
                  JOIN (SELECT car_plate,MAX(return_time) time FROM reservation GROUP BY car_plate) x
                  ON x.car_plate = r.car_plate AND x.time = r.return_time
                  RIGHT JOIN car c ON c.plate = r.car_plate
                  WHERE c.status = 'Active'
                  AND (return_time < ? OR r.return_time IS NULL)
                  AND (return_office = ? OR (r.return_office IS NULL AND current_office = ?))
                  ${conditions}`, valueList,
        async (error,result) => {
            res.json(result);
        });
}));

module.exports = router;

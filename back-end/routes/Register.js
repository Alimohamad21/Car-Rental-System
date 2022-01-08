const express = require('express')
const router = express.Router()
const db = require('../database');
const md5=require('md5')


router.post("/", (async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = md5(req.body.password);
    const phoneNumber = req.body.phoneNumber;
    const nationalId= req.body.nationalId;
    const username=req.body.username;
    db.query(`SELECT * FROM user WHERE email = ? OR username= ?`, [email,username],(error, rows) => {
        console.log(`exists query returned ${rows.length}`);
        if (rows.length > 0) {
            res.json({"data": "Account already exists"});
        }
        else {
            db.query(
                "INSERT INTO user (first_name,last_name,email,password,phone_number,National_ID,username) VALUES (?,?,?,?,?,?,?)",
                [firstName, lastName, email, password, phoneNumber,nationalId,username],
                (error, rows) => {
                    console.log(`error in inserting is${error}`)
                        res.json({"data": "success"});
                }
            );
        }
    });

}));

module.exports = router;

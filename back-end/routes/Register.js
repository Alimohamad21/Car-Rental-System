const express = require('express')
const router = express.Router()
const db = require('../database');
const md5=require('md5')

// router.get('/',(async(req, res) => {
//
//     let user = {name: 'ahmed',createdAt :'2022-01-05 09:55:45',updatedAt :' 2022-01-05 09:57:11'};
//     let sql = 'INSERT INTO users SET ?';
//     let query = db.query(sql,user,(err,response)=>{
//         if(err)
//             throw err;
//         res.json(user);
//     })
// }));

router.post("/", (async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = md5(req.body.password);
    const phoneNumber = req.body.phoneNumber;
    db.query(`SELECT * FROM user WHERE email = ?`, [email],(error, rows) => {
        console.log(`error is ${error}`)
        if (rows.length > 0) {
            res.json({"data": "Email already exists"});
        }
        else {
            db.query(
                "INSERT INTO user (first_name,last_name,email,password,phone_number) VALUES (?,?,?,?,?)",
                [firstName, lastName, email, password, phoneNumber],
                (error, rows) => {
                    res.json({"data": "success"})
                }
            );
        }
    });

}));

module.exports = router;

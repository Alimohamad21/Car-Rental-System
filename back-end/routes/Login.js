const express = require('express')
const router=express.Router()
const db = require('../database');

router.post("/",(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query(
        "SELECT email,password FROM user WHERE email = ? AND password = ?",
        [email,password],
        (error, res) => {
            if (error)
               console.log(error);
            if (res.length > 0)
                console.log(res);
            else
                console.log('Wrong email or password!');
        }
    );
}));

module.exports=router;
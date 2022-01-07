const express = require('express')
const router=express.Router()
const db = require('../database');
const md5=require('md5')

router.post("/",(async (req, res) => {
    const email = req.body.email;
    const password = md5(req.body.password);
    db.query(
        "SELECT email,password FROM user WHERE email = ? AND password = ?",
        [email,password],
        (error, rows) => {
            if (error)
               console.log(error);
            if (rows.length > 0)
                res.json({'data':'success'})
            else
                res.json({'data':'Invalid credentials'})
        }
    );
}));

module.exports=router;

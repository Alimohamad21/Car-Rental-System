const express = require('express')
const router=express.Router()
const db = require('../database');

//const {Users} = require('../models')
router.get('/',(async(req, res) => {

    let user = {name: 'ahmed',createdAt :'2022-01-05 09:55:45',updatedAt :' 2022-01-05 09:57:11'};
    let sql = 'INSERT INTO users SET ?';
    let query = db.query(sql,user,(err,response)=>{
        if(err)
            throw err;
        res.json(user);
    })
    // const allUsers=await Users.findAll();
    // res.json(allUsers)
}));
router.post("/",(async (req, res) => {
    // const user=req.body;
    // console.log(user)
    // await Users.create(user);
    // res.json(user)
}));
module.exports=router;

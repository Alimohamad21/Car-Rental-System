// const express = require('express')
// const router = express.Router()
// const db = require('../database');
// const toSQLDate=(date)=>{
//     console.log(date.substr(0,date.indexOf('T')))
//     return date.substr(0,date.indexOf('T'));
// }
// router.get("/", (async (req, res) => {
//     let valuesList=[]
//     let advancedSearch=false;
//     let conditions=''
//     const reservationNo=req.body.reservationNo;
//     if(reservationNo!=='' &&  reservationNo!=null)
//     {
//         if(!advancedSearch) {
//             advancedSearch = true;
//             conditions+=' WHERE reservation_number = ? '
//         }
//         valuesList.push(parseInt(reservationNo))
//     }
//     const username=req.body.username;
//     if(username!=='' && username!=null)
//     {
//         if(!advancedSearch) {
//             advancedSearch = true;
//             conditions+=' WHERE username = ? '
//         }
//         else
//             conditions+='AND username = ? '
//         valuesList.push(username)
//     }
//     const carPlate=req.body.carPlate;
//     if(carPlate!=='' && carPlate!=null)
//     {
//         if(!advancedSearch) {
//             advancedSearch = true;
//             conditions+=' WHERE car_plate = ? '
//         }
//         else
//             conditions+='AND car_plate = ? '
//         valuesList.push(carPlate)
//     }
//     const reservationTime=req.body.reservationTime;
//     if(reservationTime!=='' && reservationTime!=null)
//
//     {
//         if(!advancedSearch) {
//             advancedSearch = true;
//             conditions+=' WHERE reservation_time = ? '
//         }
//         else
//             conditions+='AND reservation_time = ? '
//         valuesList.push(toSQLDate(reservationTime))
//     }
//     const pickUpTime=req.body.pickUpTime;
//     if(pickUpTime!=='' && pickUpTime!=null)
//     {
//         if(!advancedSearch) {
//             advancedSearch = true;
//             conditions+=' WHERE pickup_time = ? '
//         }
//         else
//             conditions+='AND pickup_time = ? '
//         valuesList.push(toSQLDate(pickUpTime))
//     }
//     const returnTime=req.body.returnTime;
//     if(returnTime!=='' && returnTime!=null)
//     {
//         if(!advancedSearch) {
//             advancedSearch = true;
//             conditions+=' WHERE return_time = ? '
//         }
//         else
//             conditions+='AND return_time = ? '
//         valuesList.push(toSQLDate(returnTime))
//     }
//     const returnOffice=req.body.returnOffice;
//     if(returnOffice!=='' && returnOffice!=null)
//     {
//         if(!advancedSearch) {
//             advancedSearch = true;
//             conditions+=' WHERE return_office = ? '
//         }
//         else
//             conditions+='AND return_office = ? '
//         valuesList.push(parseInt(returnOffice))
//     }
//     const payment=req.body.payment;
//     if(payment!=='' && payment!=null)
//     {
//         if(!advancedSearch) {
//             advancedSearch = true;
//             conditions+=' WHERE payment = ? '
//         }
//         else
//             conditions+='AND payment = ? '
//         valuesList.push(payment)
//     }
//     db.query(`SELECT * FROM RESERVATION${conditions}`,valuesList,(error, rows) => {
//         console.log(error)
//         if (rows.length > 0) {
//             res.json(rows);
//         }
//         else {
//             res.json([])
//         }
//     });
// }));
// module.exports = router;
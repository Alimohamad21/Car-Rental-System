const express = require('express')
const app = express()
const cors = require('cors');
app.use(express.json())
app.use(cors());


const registerRouter = require('./routes/Register')
app.use("/register", registerRouter)

const loginRouter = require('./routes/Login')
app.use("/login",loginRouter)

const locationsRouter = require('./routes/Locations')
app.use("/locations",locationsRouter)
const adminReservationsRouter = require('./routes/AdminReservations')
app.use("/adminReservations",adminReservationsRouter)
const carsRouter = require('./routes/Cars')
app.use("/cars",carsRouter)

const carsRouter = require('./routes/Cars')
app.use("/cars",carsRouter)

const searchRouter = require('./routes/Search')
app.use("/search",searchRouter)

const confirmRouter = require('./routes/Confirm')
app.use("/confirm",confirmRouter)

const reservationsRouter = require('./routes/Reservations')
app.use("/reservations",reservationsRouter)

app.listen(3001, () => {
    console.log('server running on 3001')
});


const express = require('express')
const app = express()
const cors = require('cors');
app.use(express.json())
app.use(cors());
//const db = require('./models');



const usersRouter = require('./routes/Users')
app.use("/users", usersRouter)


app.listen(3001, () => {
    console.log('server running on 3001')
});

// db.sequelize.sync().then(() => {
//     app.listen(3001, () => console.log('server running on 3001'))
// }).catch((e) => console.log(e))

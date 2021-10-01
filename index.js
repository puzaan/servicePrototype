const express = require('express')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const connectDB = require('./config/db')
const {notFound, errorHandler} = require ('./middleware/errorMiddleware')
const path = require('path')
const hospitalRoutes = require ('./routes/hospitalRoutes')
const ambulanceRoutes = require('./routes/ambulanceRoutes')
const bloodRoutes = require('./routes/bloodRoutes')
dotenv.config()
connectDB();
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));
app.use(morgan());
app.get('/', (req, res) => {
    res.send("server is running");
})



app.use("/api/hospital", hospitalRoutes.routers);
app.use("/api/ambulance", ambulanceRoutes.routers);
app.use("/api/blood", bloodRoutes.routers);
app.use(notFound)
app.use(errorHandler)




const port = process.env.PORT || 5000
app.listen(port, console.log(`server is running on port ${port}`.green.bold))

const express = require('express');
const app = express();

require('dotenv').config()

var cors = require('cors')

// Import ErrorHandler 
const errorHandler = require('./middleware/errorHandler');

// Activate Model
require('./models');

// Import Routes
const { OrderRoutes, UserRoutes, ProcurementRoutes, WarehouseRouter, WorkSpaceRouter } = require('./routes');

// Can Use req.body
app.use(express.json());  

// Using Cors Policy
app.use(cors())

const api = 'https://ustay.onrender.com/';

// Get Creating Routes
app.use(`${api}/user`, UserRoutes);
app.use(`${api}/order`, OrderRoutes);
app.use(`${api}/procurement`, ProcurementRoutes);
app.use(`${api}/warehouse`, WarehouseRouter);
app.use(`${api}/workspace`, WorkSpaceRouter)

// Handle Error
app.use(errorHandler);

app.listen(3000,()=>{
    console.log(`listening ${process.env.PORT} port`);
})
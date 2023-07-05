
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
app.use(`/user`, UserRoutes);
app.use(`/order`, OrderRoutes);
app.use(`/procurement`, ProcurementRoutes);
app.use(`/warehouse`, WarehouseRouter);
app.use(`/workspace`, WorkSpaceRouter)

// Handle Error
app.use(errorHandler);

app.listen(3000,()=>{
    console.log(`listening ${process.env.PORT} port`);
})
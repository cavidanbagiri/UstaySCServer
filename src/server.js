
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


// Get Creating Routes
app.use(`${process.env.API}/user`, UserRoutes); 
app.use(`${process.env.API}/order`, OrderRoutes);
app.use(`${process.env.API}/procurement`, ProcurementRoutes);
app.use(`${process.env.API}/warehouse`, WarehouseRouter);
app.use(`${process.env.API}/workspace`, WorkSpaceRouter)

// Handle Error
app.use(errorHandler);

app.listen(3000,()=>{
    console.log(`listening ${process.env.PORT} port`);
})

const express = require('express');
const app = express();
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
app.use('/user', UserRoutes);
app.use('/order', OrderRoutes);
app.use('/procurement', ProcurementRoutes);
app.use('/warehouse', WarehouseRouter);
app.use('/workspace', WorkSpaceRouter)

// Handle Error
app.use(errorHandler);

app.listen(3000,()=>{
    console.log('listening 3000 port');
})
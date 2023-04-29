
const express = require('express');
const app = express();
var cors = require('cors')

// Activate Model
require('./models');

// Import Routes
const { OrderRoutes, UserRoutes, ProcurementRoutes, WarehouseRouter } = require('./routes');

app.use(express.json());  

app.use(cors())

app.use('/user', UserRoutes);
app.use('/order', OrderRoutes);
app.use('/procurement', ProcurementRoutes);
app.use('/warehouse', WarehouseRouter);

app.listen(3000,()=>{
    console.log('listening 3000 port');
})
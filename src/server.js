
const express = require('express');
const app = express();

// Activate Model
require('./models');

// Import Routes
const { OrderRoutes } = require('./routes');

app.use('/order', OrderRoutes);

app.listen(3000,()=>{
    console.log('listening 3000 port');
})
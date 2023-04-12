
const express = require('express');
const app = express();
var cors = require('cors')

// Activate Model
require('./models');

// Import Routes
const { OrderRoutes } = require('./routes');

app.use(express.json());

app.use(cors())

app.use('/order', OrderRoutes);

app.listen(3000,()=>{
    console.log('listening 3000 port');
})
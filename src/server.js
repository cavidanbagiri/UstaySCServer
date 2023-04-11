
const express = require('express');
const app = express();

// Activate Model
require('./models');

app.get('/',(req, res)=>{
    res.send('Hello Ustay');
})


app.listen(3000,()=>{
    console.log('listening 3000 port');
})
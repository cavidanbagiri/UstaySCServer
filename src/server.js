
const express = require('express');
const app = express();



app.get('/',(req, res)=>{
    res.send('Hello Ustay');
})


app.listen(3000,()=>{
    console.log('listening 3000 port');
})
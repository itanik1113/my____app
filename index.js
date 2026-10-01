const express = require('express');
const app = express();
const userRoute = require('./route/userRoute');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/FSWD_C9');

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');



app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoute);
app.listen(3000, ()=>{
   console.log("Example app listening on port 3000")
})
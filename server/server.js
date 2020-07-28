const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors');

const config = require('./database/DB');
const ItemRouter = require('./routes/ItemRouter');

const app = express();
const PORT = 4200;

mongoose.connect(config.DB).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database' +err)
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use('/items', ItemRouter);

app.listen(PORT, function(){
    console.log('Server running on Port: ', PORT)
})
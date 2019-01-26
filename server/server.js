const express = require('express');
const mongoose = require('mongoose');

const app = express();

require('./config/config');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require('./routes/user'));

mongoose.connect('mongodb://localhost:27017/cafe', { useNewUrlParser: true }, (err, resp) => {
    if (err) throw err;

    console.log('Connected to database');
});

app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT);
});
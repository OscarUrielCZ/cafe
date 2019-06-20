const express = require('express');
const mongoose = require('mongoose');

const app = express();

require('./config/config');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuración global de rutas
app.use(require('./routes/index'));

// Conexión a la base de datos
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, resp) => {
    if (err) throw err;

    console.log('Connected to database');
});

app.listen(process.env.PORT, () => {
    console.log('Listening on port', process.env.PORT);
});
const express = require('express');
const app = express();

require('./config/config');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/usuario/:id', (req, res) => {
    res.status(200).json({
        id: req.params.id
    });
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto', process.env.PORT);
});
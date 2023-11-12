const express = require('express');
const dbConecction = require('./database/config');
const cors = require('cors')
require('dotenv').config();


const app = express();

//Base de datos

dbConecction()

//cors

app.use(cors())

app.use( express.static('public'));
//Lectura y parseo del body
app.use( express.json())

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//rutas crud

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: ', process.env.PORT)
})
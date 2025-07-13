const { default: mongoose } = require('mongoose');
const ConnectFunc = require('./db')
const express = require('express');
require('dotenv').config()
const cors = require('cors')

ConnectFunc();

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'auth_token']
}));



app.use(express.json())

app.use('/', require('./routes/home.route'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/notes', require('./routes/notes.routes'))
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on http://localhost:${process.env.PORT}`)
})

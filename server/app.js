const express = require('express')
const db = require('./src/db/controller.js')
const cors= require('cors')
const cookieParser = require('cookie-parser')
const router = require('./src/router/routers.js')
const env = require('dotenv')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['POST', 'GET', 'DELETE', 'PUT'],
    credentials: true
}))

app.use(router)

app.listen(3000, ()=>console.log("Server connected"))
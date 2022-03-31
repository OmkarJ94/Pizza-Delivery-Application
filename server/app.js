const express = require('express')
const app = express();
var cookieParser = require('cookie-parser')
app.use(cookieParser())
require('dotenv').config({})
require("./conn/conn")
app.use(express.json())
app.use(require("./router/auth"))

app.listen(5000)

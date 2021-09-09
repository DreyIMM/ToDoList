const express = require('express')
const checkListRouter = require('./src/routes/checkList')
const app = express();
app.use(express.json()) 
require('./config/database')

app.use('/checkList', checkListRouter)

app.listen(3000, ()=>{
    console.log("Servidor Iniciado");
})
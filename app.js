require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter')
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Conectado ao banco');
}).catch((error) =>{
    console.log(error);
})

app.use('/user', express.json(), userRouter);
app.use('/admin', express.json(), adminRouter);

app.listen(process.env.PORT,  () => {
    console.log(`Servidor rodando na porta: ${process.env.PORT}`);
;})
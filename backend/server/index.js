
const mongodb = require("mongodb");
const express = require("express");
require('dotenv').config()
const connectDB = require("../config/db");
const userRotes= require('../routes/userRouter');
const { notFound, errorHandler } = require("../Middlewears/errorMiddlewear");
const morgan = require('morgan')
const cors = require('cors')


const PORT = process.env.PORT || 3001;

const app = express();
connectDB();
app.use(express.json())

app.use(morgan('dev'))
app.use(cors())



// app.get('/',(req,res)=>{
//   res.json(notes)
// })

app.use('/', userRotes)
app.use('/add-company',userRotes)
app.use('/admin',userRotes)
app.use('/admin/manageusers',userRotes)
app.use('/admin/blockUser',userRotes)
app.use('/admin/UnblockUser',userRotes)
app.use('/admin/applicationlist',userRotes)
app.use('/admin/approve',userRotes)

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

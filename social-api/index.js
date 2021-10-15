const express =require('express');
const app=express();
const helmet=require('helmet')
const morgan=require('morgan')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const userRoutes=require('./routes/users')
const authRoutes=require('./routes/auth')
const cors=require('cors')
dotenv.config()

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors())
// app.get('/',(req,res)=>{
//     res.send('welcom Home page')
// })
// routes
app.use('/users',userRoutes)
app.use('/auth',authRoutes)

mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true},()=>{
    console.log('db connection successful');
})


app.listen(process.env.PORT,()=>{
    console.log('Bakend is runing');
})
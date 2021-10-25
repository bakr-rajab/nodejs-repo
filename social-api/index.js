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

// routes
app.use('/users',userRoutes)
app.use('/auth',authRoutes)

mongoose.connect(process.env.LOCAL_DB,{useNewUrlParser:true},async (err, db)=>{
    if(!err)
    {
       await app.listen(process.env.PORT,()=>{
            console.log('Bakend is runing');
        })
        console.log('db connection successful ... %d',db);
    }
    else console.warn('db connection errors ...');
})



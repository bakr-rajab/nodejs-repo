const express =require('express');
const app=express();
const helmet=require('helmet')
const morgan=require('morgan')
require('dotenv').config();
const mongoose=require('mongoose')

const userRoutes=require('./routes/users')
const authRoutes=require('./routes/auth')
const todoRoutes=require('./routes/todos')

const cors=require('cors')


// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors())

app.use((err,req,res,next) => {
    res.status(500).json({message:err.message});
})

// app.use('/users',userRoutes)
// app.use('/auth',authRoutes)
app.use('/todos',todoRoutes)

app.get('/',(req,res)=>{
    res.json({success:1111})
})
mongoose.connect(process.env.LOCAL_DB||`mongodb://127.0.0.1:27017/todos`,{useNewUrlParser:true},async (err, db)=>{
    if(!err)
    {
       await app.listen(process.env.PORT||5000,()=>{
            console.log('Bakend is runing On %s',process.env.PORT||5000);
        })
        console.log('db connection successful ... %s',db);
    }
    else console.warn('db connection errors ...');
})



const express =require('express');
const app=express();
const helmet=require('helmet')
const morgan=require('morgan')
const dotenv=require('dotenv').config();
const mongoose=require('mongoose')
const userRoutes=require('./routes/users')
const authRoutes=require('./routes/auth')
const productRoutes=require('./routes/products')
const cors=require('cors')
// dotenv.config()
// require('dotenv').config({ path: '.env' });


// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors())
app.use((err,req,res,next) => {
    res.status(500).send({message:err.message});
})

// routes
app.use('/users',userRoutes)
app.use('/auth',authRoutes)
app.use('/products',productRoutes)

app.get('/test',(req,res)=>{
    res.json({success:1111})
})
mongoose.connect(process.env.LOCAL_DB||`mongodb://127.0.0.1:27017/social`,{useNewUrlParser:true},async (err, db)=>{
    if(!err)
    {
       await app.listen(process.env.PORT||8080,()=>{
            console.log('Bakend is runing');
        })
        console.log('db connection successful ... %s',db);
    }
    else console.warn('db connection errors ...');
})



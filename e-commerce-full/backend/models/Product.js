const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
    },
    category:{
        type: String,
       default:""
    },
    img:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        default:0
    },
    brand:{
        type:String,
        default:""
    },
    rating:{
        type:Number,
        default:1
    },
    reviews:{
        type:Number,
        default:1
    },
    description:{
        type:String,
        default:""
    }
},{timestamps:true})

module.exports=mongoose.model('Product',productSchema);
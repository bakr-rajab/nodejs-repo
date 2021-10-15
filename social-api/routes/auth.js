const router =require('express').Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')

router.post('/login',async (req,res)=>{
    try {
        const user=await User.findOne({'email':req.body.email})
        !user && res.status(404).json('user not found'+req.body.email)

        const password=await bcrypt.compare(req.body.password,user.password)
        !password &&res.status(404).json('wrong password')
        
        res.status(200).json(user)
    } catch (err) {
        res.json(err)   
    }
    
})
router.post('/register',async (req,res)=>{
    
    try {
        const salt=await bcrypt.genSalt(10)
        const hashPass=await bcrypt.hash(req.body.password,salt)
        
        const user=await new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPass
        })

        user.save()
        res.status(200).json(user)
    } catch (error) {
        console.log(err);
    }
   
    // res.json(req.body.name)
})

module.exports=router
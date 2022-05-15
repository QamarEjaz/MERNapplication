const express=require('express')
const User=require('../models/userModel')
const bcrypt=require('bcryptjs')
const jsonwebtoken=require('jsonwebtoken')


const register=async(req,res)=>{
    const {name,email,password}=req.body
    if(!name||!email||!password){
        res.status(400)
        throw new Error("user not register")
    }
    const salt=await bcrypt.genSalt(10)
    const hashPassword=await bcrypt.hash(password,salt)
    const user=await User.create({
        name,
        email,
        password:hashPassword
    })
    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            password:user.password,
            token:genrateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("user not register")
    }
    
}
const login= async(req,res)=>{
   const {email,password}=req.body
   const user=await User.findOne({email:email})
   if(user && (await bcrypt.compare(password,user.password))){
       res.status(201).json({
        _id:user.id,
        name:user.name,
        email:user.email,
        token:genrateToken(user._id)
       })
   }else{
       res.status(400)
       throw new Error("user not found")
   }
}
const getme=(req,res)=>{
    res.status(200).json(req.body)
} 
const genrateToken=(id)=>{
   return jsonwebtoken.sign({id},"YGYGKUGGGGGUKGUG",{
       expiresIn:"30d",
   })
}

module.exports={
    register,
    login,
    getme
}
const express=require('express')
const jwt=require('jsonwebtoken')
const User=require('../models/userModel')

const protect=async(req,res,next)=>{
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        try {
          // Get token from header
          token = req.headers.authorization.split(' ')[1]
          // Verify token
          const decoded = jwt.verify(token, 'YGYGKUGGGGGUKGUG')
          console.log(decoded)
    
          // Get user from the token
          req.user = await User.findById(decoded.id).select('-password')
    
          next()
        } catch (error) {
          console.log(error)
          res.status(401)
          throw new Error('Not authorized')
        }
      }
    
     if(!token){
         res.status(401)
         throw new Error('required tokken')
     }
    
}
module.exports={protect}
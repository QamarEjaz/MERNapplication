const express=require('express')
const userRoute=express()
const {register,login,getme}=require('../controllers/userController')
const {protect} =require('../eerormidleware/authMiddleware')

userRoute.post('/',register)
userRoute.post('/login',login)
userRoute.get('/getme',protect,getme)


module.exports=userRoute
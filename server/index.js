const express=require('express')
const dotenv=require('dotenv')
dotenv.config()
const route=require('./routes/goalsroute')
const userroute=require('./routes/userroutes')
const connectDB=require('./config/db')
const app=express()
const cors=require('cors')
app.use(cors())
const port=process.env.PORT||5000
connectDB()
const {errHandler, errorhandle}=require('./eerormidleware/errormddileware')
app.use(express.json())
// goals apis
app.use('/api/goals',route)
app.use('/api/users',userroute)

app.use(errorhandle)


// serever 
app.listen(port,()=>{
 console.log(`server is listening ${port}`)
})
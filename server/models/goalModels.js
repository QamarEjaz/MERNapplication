const mongoose=require('mongoose')

const goalSchema=mongoose.Schema({
    user:{
       type:mongoose.Schema.Types.ObjectId,
       required:true,
       ref:'User'
    },
    goals:{
        type:String,
        required:[true,'please ad a text'],
    },
},{timestamps:true})
module.exports=mongoose.model("Goals",goalSchema)
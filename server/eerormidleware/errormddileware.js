const errorhandle=(err,req,res,next)=>{
    const statuscode=res.statuscode?statuscode:500;
    res.status(statuscode);
    res.json({
        message:err.message,
        stack:process.env.NOD_ENV==='production'?null:err.stack,
    })
}
module.exports={errorhandle}
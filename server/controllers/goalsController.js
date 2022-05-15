const Goals=require('../models/goalModels')
const User=require('../models/goalModels')
const getGoals=async(req,res)=>{
    const goals=await Goals.find({user:req.user.id})
    res.status(200).json(goals)
}
const setGoals= async(req,res)=>{
    // const user=req.params.id
   
   const goal=await Goals.create({
       goals:req.body.text,
       user:req.user.id
   })
  
    if(goal){
        res.status(201).json(goal)
    }
    else{
        res.status(400)
        throw new Error('goals not found')
    }
    
}
const updateGoals=async(req,res)=>{
   const goal = await Goals.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
    const updateGoals=await Goals.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })
    if(updateGoals){
        res.status(200).json(updateGoals)
    }else{
        res.status(400)
        throw new Error('user not updated')
    }
   
}
const deleteGoals=async(req,res)=>{
    const goal=Goals.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error("not deleted")
    }
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
      } 
      if (goal.user.toString() !== req.user.id) {
          console.log(goal.user)
        res.status(401)
        throw new Error('User not authorized')
      }
    await goal.remove()
    
    res.status(200).json({id:req.params.id})
}

module.exports=({
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
})
const mongoose=require('mongoose')

const connectDB= async() =>{
    try {
        await mongoose.connect("mongodb+srv://QAMAR:Ya8FhNaOiEC5Apbm@cluster0.ens96.mongodb.net/brade?retryWrites=true&w=majority")
        console.log('db connected')

    } catch (error) {
        console.log(error)
    }
}
module.exports=connectDB
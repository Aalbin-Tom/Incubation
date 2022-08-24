const mongoose = require("mongoose");

const connectDB = ()=>{
    try {
     const conn =  mongoose.connect('mongodb+srv://aalbin:aalbin2000@cluster0.cmx8iie.mongodb.net/?retryWrites=true&w=majority')
        console.log(`connected mongo`);
    } catch(error){
        console.log(`error:${error}`);
        process.exit();
    }
}
module.exports = connectDB
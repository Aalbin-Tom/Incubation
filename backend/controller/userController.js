const User= require('../models/userModel')
const Ticket = require('../models/ticketModel')
const asyncHandler = require("express-async-handler")
const generateToken = require('../Utils/generateTokens');
// const { Admin } = require('mongodb');



const registerUser  =asyncHandler( async(req,res)=>{

    const { name, email, password } = req.body;
console.log(req.body);
    // console.log(email);
    const userExists= await User.findOne({email})
   
    if(userExists){
        res.status(400)
        throw new Error("User allready Exists")
    }else{

    const user= await User.create({
        name,email,password
    });
    if(user){
        res.json({
            _id:user._id,
            name:user.name, 
            email:user.email,
            isAdmin:"false",
            token:generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error("error") 
    } 
}
})
   

const authUser  =asyncHandler( async(req,res)=>{
    const {  email, password } = req.body;
    
console.log(req.body);
    const user= await User.findOne({email})
    
    if(user.status){
    if(user && (await user.matchPassword(password))){
        res.json({
             _id:user._id,
            name:user.name, 
            email:user.email,
            isAdmin:"false",
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid Email or Password") 
    }  }else{
        throw new Error(' USER  IS  BLOCKED ')
    }
})

const adduser = asyncHandler(async (req,res)=>{

    const { name,email, place , address, phone, company} =req.body
    console.log(req.body);
    const ticket = await Ticket.create({
        name,email, place , address, phone, company
    })
    if(ticket){
        console.log("halooooooooooooooooo");
         res.json({
            
            name:ticket.name, 
            email:ticket.email,
            place:ticket.place,
            address:ticket.address,
            phone:ticket.phone,
            company:ticket.company,
            status:ticket.status
        })
    }else{
        res.status(400)
        throw new Error(error)
    }
    
})



module.exports = {registerUser , authUser , adduser}
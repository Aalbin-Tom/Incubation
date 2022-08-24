const asyncHandler = require("express-async-handler")
const generateToken = require('../Utils/generateTokens');
const User= require('../models/userModel');
const Ticket = require("../models/ticketModel");



const isadmin =asyncHandler(async (req,res)=>{
    const cred ={
        email:"admin@gmail.com",
        password:"admin"
    }
    const { email, password } =req.body
    console.log(req.body);
   
    if(cred.email==email && cred.password==password){
        res.json({
            name:"Admin",
            email:email,
            isAdmin:"true",
            token:generateToken(email)
        })
    }else{
        res.status(400)
        throw new Error("Invalid Email Or Password")
    }

})


const getUser = asyncHandler(async(req,res)=>{
      const users = await User.find();

         if (users) {
            res.json({ users });
        } else {
            res.status(400);
            throw new Error("No users available");
        }

})

const blockUser =asyncHandler(async(req,res)=>{

     const { _id } = req.body;
     console.log(req.body);

  let user = await User.findOne({ _id: _id });

  if (user) {
    let success = await User.updateOne(
      { _id: _id },
      {
        $set: { status: false },
      }
    );
    userdata = await User.findOne({ _id: _id });
   console.log(userdata);
    res.json({ user });
  } else {
    res.status(400);
    throw new Error("No users available");
  }
})

const UnblockUser = asyncHandler(async(req,res)=>{

     const { _id } = req.body;
     console.log(req.body);

  let user = await User.findOne({ _id: _id });

  if (user) {
    let success = await User.updateOne(
      { _id: _id },
      {
        $set: { status: true },
      }
    );
    userdata = await User.findOne({ _id: _id });
   console.log(userdata);
    res.json({ user });
  } else {
    res.status(400);
    throw new Error("No users available");
  }
})

const getCompanys =asyncHandler(async(req,res)=>{
    const companys = await Ticket.aggregate([
        {$match:{
            status:"pending"
             }
         }
    ])

         if (companys) {
            res.json({ companys });
        } else {
            res.status(400);
            throw new Error("No users available");
        }

})

const approve =asyncHandler(async (req,res)=>{
    const {id} = req.body
    
    let approve = await Ticket.updateOne(
      { _id: _id },
      {
        $set: { status: "approved" },
      }
    );
})

module.exports ={isadmin, getUser,blockUser,UnblockUser, getCompanys,approve}
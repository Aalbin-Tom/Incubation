const asyncHandler = require("express-async-handler")
const generateToken = require('../Utils/generateTokens');
const User= require('../models/userModel');
const Ticket = require("../models/ticketModel");
const Rooms = require('../models/roomsModel')
const mongoose =require("mongoose");



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
    const {_id} = req.body
    console.log(_id);
    let approve = await Ticket.updateOne(
      { _id: _id },{$set: { status: "approved" }});
     const companys = await Ticket.find()
    console.log(companys);
    if(approve){
        res.json({
           companys
        })
    }else{
        res.status(400)
        throw new Error(error)
    }
})

const decline =asyncHandler(async (req,res)=>{
    const {_id} = req.body
    console.log(_id);
    let approve = await Ticket.updateOne(
      { _id: _id },{$set: { status: "declined" }});
     const companys = await Ticket.find()
    console.log(companys);
    if(approve){
        res.json({
           companys
        })
    }else{
        res.status(400)
        throw new Error(error)
    }
})

const approvedlist =asyncHandler(async (req,res)=>{
    const companys = await Ticket.aggregate([
        {$match:{
            status:"approved"
             }
         }
    ])

         if (companys) {
            res.json({ companys });
        } else {
            res.status(400);
            throw new Error( "Approved list not available");
        }
})

const declinedlist =asyncHandler(async (req,res)=>{
    const companys = await Ticket.aggregate([
        {$match:{
            status:"declined"
             }
         }
    ])

         if (companys) {
            res.json({ companys });
        } else {
            res.status(400);
            throw new Error( "Declined list not available");
        }
})

const addroom= asyncHandler( async(req,res)=>{
     const {number, name,email, place , address, phone, company} =req.body
    console.log(req.body);
    const room = await Rooms.create({
       number, name,email, place , address, phone, company
    })
    if(room){
        res.json({
            _id:room._id,
            number:room.number,
            name:room.name, 
            email:room.email,
            place:room.place,
            address:room.address,
            phone:room.phone,
            company:room.company,
            status:room.status
        })
}else{
    res.status(400)
        throw new Error("Somthing Went Wrong") 
}

})

const getrooms=asyncHandler(async(req,res)=>{
    const rooms= await Rooms.find()
 if (rooms) {
            res.json({ rooms });
        } else {
            res.status(400);
            throw new Error("No users available");
        }
})


    const asignslot= asyncHandler( async(req,res)=>{
        
         const {_id ,company} = req.body
    console.log(req.body);
    let  companys = await Ticket.updateOne(
        {_id:company},{$set:{status:"booked"}})
     let Company = await Ticket.findOne({_id:company})
    console.log(Company, "kkkkkkkkkkkkk");
    let data = await Rooms.updateOne(
      { _id: _id },{$set: {name:Company.name,email:Company.email,address:Company.address,phone:Company.phone,company:Company.company,status:true}});
        if(data){
              res.json({ data });
        } else {
            res.status(400);
            throw new Error("No users available");
        
        }

    })
    
    const viewdata=asyncHandler( async(req,res)=>{
         const {_id} =req.body
        console.log(_id);
         let view =await Rooms.findOne({_id:_id})
         console.log(view);
         if(view){
            res.json({view})
         }else{
            res.status(400);
            throw new Error("No data available");
         }
    })
   
module.exports ={isadmin, getUser,blockUser,UnblockUser, getrooms, getCompanys,asignslot, approve, decline, approvedlist, declinedlist,addroom, viewdata}
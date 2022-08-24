const { Int32 } = require("mongodb");
const mongoose =require ("mongoose")


const ticketSchema = mongoose.Schema(
    {
        name:{
            type:String,
            requried:true
        },
        email: {
            type: String,
            required: true,
        },
        place: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default:"pending"
        },
    }
)


const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
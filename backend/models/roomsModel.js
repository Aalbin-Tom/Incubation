const mongoose =require ("mongoose")

const roomsSchema = mongoose.Schema(
    {
        name:{
            type:String,
        },
        number:{
           type:Number,
           required:true , 
        },
        email: {
            type: String, 
        },
        place: {
            type: String,
        },
        address: {
            type: String,
        },
        phone: {
            type: Number,
        },
        company: {
            type: String,
        },
        status: {
            type: Boolean,
            required: true,
            default:false
        },
    }
)


const rooms = mongoose.model("Rooms", roomsSchema);
module.exports = rooms;
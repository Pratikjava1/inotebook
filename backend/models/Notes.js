const mongoose =require("mongoose");

const notesSchema = mongoose.Schema({
    user:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"users"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        default:"Notes"

    },
    tag:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model("Notes",notesSchema);
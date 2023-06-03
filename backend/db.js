const mongoose =require("mongoose");
const URL="mongodb+srv://pratik123:pratik%40123@mycluster.41hr7.mongodb.net/myNotesDB?retryWrites=true&w=majority";


const dbconnect=()=>{
    mongoose.connect(URL).then(()=>{
        console.log("connected");
    }).catch((err)=>{
        console.log(err);
    })
    
}

module.exports = dbconnect;
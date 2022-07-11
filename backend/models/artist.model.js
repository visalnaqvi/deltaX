const mongoose = require("mongoose");
const artistSchema = new mongoose.Schema({
    name:{type:String, required:true},
    bio:{type:String, required:true},
    dob:{type:Date, required:true},
    rating:{type:Array},
},{
    timestamps:true,
})

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;
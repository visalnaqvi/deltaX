const mongoose = require("mongoose");
const songSchema = new mongoose.Schema({
    name:{type:String, required:true},
    image:{type:String, required:true},
    artist:{type:Array, required:true},
    dor:{type:Date, required:true},
},{
    timestamps:true,
})

const Song = mongoose.model('Song', songSchema);
module.exports = Song;
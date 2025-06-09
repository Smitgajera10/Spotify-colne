const mongoose = require('mongoose');

const Playlist = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    thumbnail: {
        type : String,
    },
    description: {
        type : String,
    },
    owner:{
        type : mongoose.Schema.ObjectId,
        ref : "User",
    },
    songs: [
        {
            type : mongoose.Schema.ObjectId,
            ref : "Song",
        },
    ],
    collebrators : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "User",
        }
    ]
})

const PlaylistModel = mongoose.model("Playlist" , Playlist);

module.exports = PlaylistModel;
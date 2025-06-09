const express = require("express");
const passport = require("passport");
const router = express.Router();
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Song = require("../models/Song");

// create playlist
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentuser = req.user;

    const { name, thumbnail, songs , description} = req.body;

    if (!name)
      return res.status(301).json({ error: "Insufficient data" });

    const playlistData = {
      name,
      thumbnail,
      songs,
      description,
      owner: currentuser._id,
      collebrators: [],
    };

    const playlist = await Playlist.create(playlistData);
    return res.status(200).json(playlist);
  }
);

router.delete("/delete/:playlistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { playlistId } = req.params;

    const playlist = await Playlist.findOne({ _id: playlistId });

    //check playlist exists
    if (!playlist) {
      return res.status(304).json({ error: "Playlist does not exist" });
    }

    //check for owner or collaberator
    if (!playlist.owner.equals(currentUser._id) && !playlist.collebrators.includes(currentUser._id)) {
      return res.status(400).json({ error: "Not allowed" });
    }

    //now delete the playlist
    await Playlist.deleteOne({ _id: playlistId });

    return res.status(200).json({ message: "Playlist deleted successfully" });
  });

// get playlist by id
router.get("/get/:playlistId" , passport.authenticate("jwt" , {session : false}) , async (req,res)=>{
    const playlistId = req.params.playlistId;

    const playlist = await Playlist.findOne({_id : playlistId}).populate({
      path : "songs",
      populate : {
        path : "artist",
      }
    });

    if(!playlist){
        return res.status(301).json({error : "Invalid ID"});
    }

    return res.status(200).json(playlist);
});

// get playlist by artist
router.get("/me" , passport.authenticate("jwt" , {session : false}) , async(req , res)=>{

  const artistId = req.user._id;

  const playlists = await Playlist.find({owner : artistId}).populate("owner");
  return res.status(200).json({data : playlists});

});

router.get("/get/artist/:artistId" , passport.authenticate("jwt" , {session : false}) , async(req , res)=>{

  const artistId = req.params.artistId;

  //check if artist id exist
  const artist = await User.findOne({_id : artistId});
  if(!artist){
    return res.status(304).json({error : "Invalid Artist ID"});
  }

  const playlists = await Playlist.find({owner : artistId});
  return res.status(200).json({data : playlists});

});

//add songs to playlist
router.post("/add/song" , passport.authenticate("jwt" , {session : false}) , async (req,res)=>{
  const currentUser = req.user;
  const {playlistId , songId} = req.body;

  
  const playlist = await Playlist.findOne({_id : playlistId});
  //check playlist exists
  if(!playlist){
    return res.status(304).json({error : "Playlist does not exist"});
  }
  
  //check for owner or collaberator
  if(!playlist.owner.equals(currentUser._id) && !playlist.collebrators.includes(currentUser._id) ){
    return res.status(400).json({error : "Not allowed"});
  }  

  //check for song exist
  const song = await Song.findOne({_id : songId});
  if(!song){
    return res.status(304).json({error : "Snog does not exist"});
  }

  //now add the song to playlist

  playlist.songs.push(songId);
  await playlist.save();

  return res.status(200).json({playlist});
});

//delete song from playlist
router.delete("/delete/song/:playlistId/:songId" , passport.authenticate("jwt" , {session : false}) , async (req,res)=>{
  const currentUser = req.user;
  const {playlistId , songId} = req.params;

  const playlist = await Playlist.findOne({_id : playlistId});
  //check playlist exists
  if(!playlist){
    return res.status(304).json({error : "Playlist does not exist"});
  }
  
  //check for owner or collaberator
  if(!playlist.owner.equals(currentUser._id) && !playlist.collebrators.includes(currentUser._id) ){
    return res.status(400).json({error : "Not allowed"});
  }  

  //check for song exist
  if(!playlist.songs.includes(songId)){
    return res.status(304).json({error : "Song does not exist in playlist"});
  }

  //now delete the song from playlist

  playlist.songs = playlist.songs.filter((song) => !song.equals(songId));
  await playlist.save();

  return res.status(200).json({playlist});
});

router.post("/update/:playlistId" , passport.authenticate("jwt" , {session : false}) , async (req,res)=>{
  const currentUser = req.user;
  const {playlistId} = req.params;
  const {name , thumbnail , description} = req.body;

  const playlist = await Playlist.findOne({_id : playlistId});
  //check playlist exists
  if(!playlist){
    return res.status(304).json({error : "Playlist does not exist"});
  }
  
  //check for owner or collaberator
  if(!playlist.owner.equals(currentUser._id) && !playlist.collebrators.includes(currentUser._id) ){
    return res.status(400).json({error : "Not allowed"});
  }  

  //update the playlist
  if(name) playlist.name = name;
  if(thumbnail) playlist.thumbnail = thumbnail;
  if(description) playlist.description = description;

  await playlist.save();

  return res.status(200).json({playlist});
});




module.exports = router;

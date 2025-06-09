const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {getToken} = require("../utils/helpers")

router.post("/register" , async (req,res)=>{
    
    // get user details from body..
    const {email , password , firstName , lastName , username} = req.body;

    //does user with email alredy exists...
    const user = await User.findOne({email : email});
    if(user){
        return res.status(403).json({error : "A user with email alredy exist"});
    } 
    

    //else create new user in DB & use hash for password(bcrypt module)..

    const hashedPassword = await bcrypt.hash(password,10);
    const newUserData = {email , password : hashedPassword , firstName , lastName , username};

    const newUser = await User.create(newUserData);


    //make a tocken for user..

    const token = await getToken(email , newUser);

    const userToReturn = {...newUser.toJSON() , token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);

});

router.post("/login" , async (req , res)=>{

    //get email and pass from body..
    const{email , password} = req.body;

    //check if user is exist 
    const user = await User.findOne({email : email});
    if(!user){
        return res.status(403).json({error : "Invalid credentials"});
    }

    //compere both encrypted pass
    const isPasswordValid = await bcrypt.compare(password , user.password);

    if(!isPasswordValid){
        return res.status(403).json({error : "Invalid credentials"});
    }

    //get login token for user and send details.
    const token = await getToken(user.email , user);

    const userToReturn = {...user.toJSON() , token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
})


module.exports = router;
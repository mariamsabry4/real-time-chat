import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";

export const signup =  async (req,res)=>{
    const {fullName, email,password} =req.body
   try {
    if(!fullName || !password || !email){
        res.status(400).json({message : "all fields are required "})
    }
    //hash password
    if(password.length < 6){
        return res.status(400).json({
            message : "password must be at least 6 character"
        });
        const user = await User.findOne({email})
        if(user) return res.status(400).json({message :"email already exists"})
    }
const salt = await bcrypt.genSalt(10)

const hashedPassword = await bcrypt.hash(password,salt)

const newUser = new User({
    fullName,
    email,
    password : hashedPassword
})
if(newUser){

    generateToken(newUser._id, res)
    await newUser.save();

    res.status(201).json({
        _id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,

    }); 

}else{

    res.status(400).json({message : "Invalid User data"});

   
}
   } catch (error) {
    console.log("error is ", error.message);
    res.status(500).json({message: "you should fill all fields"})
    
    
   }
};

export const login = (req,res)=>{
    res.send("login route");
};

export const logout = (req,res)=>{
    res.send("logout route");
};
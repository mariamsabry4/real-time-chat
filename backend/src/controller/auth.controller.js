import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";
import { async } from './../lib/db';

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

// export const  login = async (req,res)=>{
//     const { email,password} =req.body
//     console.log(req.body);

//   try {
//     const user = await User.findOne({email})
//     if(!user){
//         return res.status(400).json({message : "invalid credential "})
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if(!isPasswordCorrect){
//         return res.status(400).json({message: "incorrect password"})
//     }
//     generateToken(user._id ,res )
//     res.status(200).json({
//         _id: user._id,
//         fullName : user.fullName,
//         email: user.email,
//         profilePic : user.profilePic,
//     })
//   } catch (error) {
//     console.log("Erorr in login controller", error.message);
//     res.status(500).json({message : "internal server error"})
    
    
//   };
// };
 export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await user.findOne({email})
        if(!user){
            return res.status(400).json({message : "invalid credential "});
        }
            const isPasswordCorrect = await bcrypt.compare(password , user.password);
            if(!isPasswordCorrect){
                res.status(400).json({message : "invalid credential"})
            
        }
    } catch (error) {
        
    }
    
 }











export const logout = (req,res)=>{
try {
    res.cookie("jwt", "", {maxAge:0})
    res.status(200).json({message : "logged out successfully"})
} catch (error) {
    console.log("error in logout controller");
    res.status(500).json({message: "internal server error"})
    
}
};
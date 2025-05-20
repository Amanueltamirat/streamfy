import User from "../models/User.js";
import jwt from 'jsonwebtoken'

export const  Signup = async (req,res)=>{
     const {email, passwod, fullName} = req.body;

     try {
        if(!email || !passwod || !fullName) {
            return res.status(400).json({message: "All fields are required"})
        }
        if(passwod.length < 6 ) {
            return res.status(400).json({message: "Password must be at least 6 characters long"})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }
         const idx = Math.floor(Math.random() * 100) + 1; // generate a num between 1-100
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const user = await User.create({
            email,
            passwod,
            fullName,
            profilePic:randomAvatar
        })

        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET_KEY, {
            expiresIn:'7d'
        })

        res.cookie('token', token, {
            maxAge: 1000 * 60 * 60 * 24 *7,
            httpOnly:true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        })
        res.status(200).json({success:true, user})
     } catch (error) {
        console.log('Error in signup controller', error);
        res.status(500).json({message:"Internal server error"});        
     }
}

export const  Signin = async (req,res)=>{
    res.send('Signin')
}

export const  Signout = (req,res)=>{
    res.send('Signout')
}
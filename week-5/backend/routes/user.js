const express=require('express');
const router=express.Router();
const {UserModel}=require("../db/models")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
// const {authMiddleware}=require("../middleware/user")
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/signup",async (req,res)=>{
        try{
            const {email,username,password} = req.body;
            const userExists=await UserModel.findOne({ $or: [{ email }, { username }] })
            if(userExists) res.status(409).json({"message": "User with this email already exists."});
            
            const hashedpassword=await bcrypt.hash(password,10);

            const newUser=new UserModel({
                email,
                username,
                password:hashedpassword
            })

            const savedUser=await newUser.save();

            const token=jwt.sign({userId:savedUser._id},JWT_SECRET);

            res.status(201).json({
                message:'User created successfully',
                user:{
                    _id: savedUser._id,
                    email: savedUser.email,
                    username: savedUser.username,
                },
                token,
            });

        }catch(err){
            res.status(401).json({message:"signup failed"})
        }
    }
);

router.post("/login",async (req,res)=>{
        try{
            const {email,password} = req.body;
            const user=await UserModel.findOne({email})
            if(!user){
                res.status(401).json({message:'Invalid credentials'});
            }

            const isValidPassword= await bcrypt.compare(password,user.password);
            

            if(!isValidPassword){
                return res.status(401).json({message:'Invalid credentials'});
            }
            const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET);

            res.status(201).json({
                message:'User logged in successfully',
                user:{
                    _id: user._id,
                    email: user.email,
                    username: user.username
                },
                token,
            });

        }catch(err){
            console.error('Login error:', err); 
            res.status(500).json({ message: "Login failed. Please try again later." });
        }
    }
);

module.exports=router;
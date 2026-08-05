import { json } from "express";
import { comparePassword, createUser, deleteUserById, findUser, updateUser } from "../services/users.service.js";
import { generateToken } from "../services/token.service.js";

const registerUser = async(req,res,next)=>{
        try {
            const {name,email,role,password} = req.body;

            if(!name || !email || !password) return res.status(400).json({
                message:"All field are important"
            })

            const emailLower = email.toLowerCase();

            await createUser(name,emailLower,role,password);

            res.status(201).send(`User ${name} added`);
        } catch (error) {
            if (error.message === 'User already exist') {
                return res.status(400).json({ message: error.message });
            }
            
            next(error);
        }
}
const loginUser = async(req,res,next)=>{
    try {
        const {id,email,password} = req.body;

        if(!email || !password) return res.status(400).json({
            message: "Need to fiel all field"
        });

        const emailLower = email.toLowerCase();

        const user = await findUser(emailLower);

        if(!user) return res.status(400).json({
            message: "User not found"
        });

        const isMatch = await comparePassword(password, user.password);

        if(!isMatch) return res.status(400).json({
            message: "Invalid password"
        })

        const jwt = generateToken(user.id,user.email);
        
        res.status(200).json({
            message: "Logged In!",
            user: {
                id: user.id, 
                name: user.name,
                email: user.email,
                token: jwt
            },
        });
        
    } catch (error) {
        next(error);
    }
}
const updateUserName = async(req,res,next)=>{
    try {
        const {newName} = req.body;

        if (!newName) {
            return res.status(400).json({ message: "New name is required" });
        }
        const userId = req.user.id;
        
        await updateUser(newName, userId);

        res.status(200).send(`Update user name to ${newName}`);
    } catch (error) {
        if (error.message === 'User not found') {
                return res.status(400).json({ message: error.message });
            }
            
        next(error);
    }
}
const deleteUser = async(req,res,next)=>{
    try {
        const userId = req.user.id;

        await deleteUserById(userId);

        res.status(200).send(`User deleted`);
    } catch (error) {
        if (error.message === 'User not found') {
                return res.status(400).json({ message: error.message });
        }
            
        next(error);
    }
}

export{
    registerUser,
    loginUser,
    updateUserName,
    deleteUser
}
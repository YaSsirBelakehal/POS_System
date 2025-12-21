import jwt from "jsonwebtoken"
import Admin from '../models/Admin.js'

export const protectAdmin = async(req,res,next)=>{
    const token = req.cookies.admin_token
    if(!token) return res.status(401).json({message:"Unauthorized"})

        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.admin = await Admin.findById(decoded.id).select("-password")
            next()
        }catch(err){
            res.status(401).json({message:"Invalid Token"})
        }
}

export const authorizeAdmin = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.admin.role)) return res.status(403).json({message:"Acces Denied"})
            next()
    }
}
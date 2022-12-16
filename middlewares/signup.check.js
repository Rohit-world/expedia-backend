const {UserModel}=require("../models/user.model")

const signupcheck =async(req, res,next)=>{
    const {email,password,name}=req.body
if(!email || !password || !name)return res.status(400).send({"msg":"wrong creadendials"})
const isPresent= await UserModel.find({email:email})

if(isPresent.length>0)return res.status(400).send({"msg":"User already exist please login"})
next()


}

module.exports={signupcheck}
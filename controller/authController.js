const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.register = async(req, res)=>{
    try {
        const {name,email,password}=req.body
        const hashPwd = await bcrypt.hash(password,7)
        const user = await User.create({
            name,email,password:hashPwd
        })
        const token = await jwt.sign({email:user.email,name:user.name},process.env.JWT_SCRT_KEY)
        res.json({status:true,token})
    } catch (error) {
        res.json(error)
    }
}
exports.login =async(req,res)=>{
    try {
        const {email,password} = req.body
        console.log(email,password)
        const user = await User.findOne({email});
        console.log('user',user)
        if(user){
            const check = await bcrypt.compare(password,user.password);
            if(check){
                let token = await jwt.sign({email:user.email,name:user.name},process.env.JWT_SCRT_KEY)
                res.json({status:true,token})
            }else{
                throw new Error('Password not match !')
            }
        }else{
            throw new Error('Email/Password mismatch')
        }
    } catch (error) {
        res.json({status:false,error})
    }
}

exports.middleware = async(req,res,next)=>{
    try {
        const {token} = req.body
        const check = jwt.verify(token,process.env.JWT_SCRT_KEY)
        if(check){
            let decodedToken = await jwt.decode(token)
            console.log(decodedToken)
            let user = await User.findOne({email:decodedToken.email})
            req.user = user;
            next()
        }else{
            res.status(401).send({error:'User Not Authorised'})
        }
    } catch (error) {
        res.status(401).send({error:'User Not Authorised'})
    }
}
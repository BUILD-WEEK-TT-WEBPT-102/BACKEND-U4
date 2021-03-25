const model = require('../users/usersModel')

const checkRegisterContents = () => async(req, res, next) =>{
    const { username , password , phoneNumber } = req.body
    if(!username){
        return res.status(404).json({message:"Please provide a username"})
    }
    if(!password){
        return res.status(404).json({message:"Please provide a password"})
    }
    if(!phoneNumber){
        return res.status(404).json({message:"Please provide a phone number"})
    }
    next();
}

const checkLoginContents = () => async(req, res, next) =>{
    const { username , password } = req.body
    if(!username){
        return res.status(404).json({message:"Please provide a username"})
    }
    if(!password){
        return res.status(404).json({message:"Please provide a password"})
    }
    req.password = password;
    next();
}

const queryUsername = () => async(req,res,next)=> {
    const {username} = req.body
    const verification = await model.findByFilter({username})
    //if username exists:
    if(verification){
       return res.status(418).json({message:"Username is already taken"})
    }
    
    next()
}

module.exports = {
    checkRegisterContents,
    checkLoginContents,
    queryUsername
}
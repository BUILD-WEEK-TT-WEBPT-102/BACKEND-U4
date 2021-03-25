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
    
    next();
}

const checkLoginType = () => async(req, res, next) =>{
    const { username , password } = req.body
    if(typeof username != 'string'){
        return res.status(400).json({message: "username is not a string"})
    }
    if(typeof password != 'string'){
        return res.status(400).json({message:"password is not a string"})
    }

    console.log(typeof password)
    console.log(typeof username)
    
    next();
}
const queryUsername = () => async(req,res,next)=> {
    const {username} = req.body
    const verification = await model.findByUsername(username)

    // console.log('username', username)
    // console.log('verification', verification)
    // console.log('typeof', typeof verification)

    if(!verification){
        console.log("broke")
        return res.status(418).json({message:"user does not exist"})
    }
    req.password = verification.password;
    next()

    
}

module.exports = {
    checkLoginType,
    checkRegisterContents,
    checkLoginContents,
    queryUsername
}
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

const queryUsernameRegister = () => async ( req , res, next )=>{
    const verification = await model.findByUsername(req.body.username)
    if(verification){
        
        return res.status(418).json({
            message:"Username taken: Unique value needed."
            })
    }
    next()
}

const checkContents = () => async(req, res, next) =>{
    
    const { username , password } = req.body
    if(!username){
        return res.status(404).json({message:"Please provide a username"})
    }
    if(!password){
        return res.status(404).json({message:"Please provide a password"})
    }
    
    
    next();
}

/* Verify that each variable has a typeOf 'string' */
const checkTypeOf = () => (req, res, next) =>{

    const { username , password } = req.body
    if(req.body.phoneNumber){
        if(typeof req.body.phoneNumber != 'string'){
            return res.status(400).json({message: "phoneNumber is not a string"})
        }
    }
    if(typeof username != 'string'){
        return res.status(400).json({message: "username is not a string"})
    }
    if(typeof password != 'string'){
        return res.status(400).json({message:"password is not a string"})
    }   
    
    next();
}
/* Check the database for a unique username entry ; save hash if user exists to 'req.hashPassword */
const queryUsernameLogin = () => async(req,res,next)=> {
    
    const {username} = req.body
    const verification = await model.findByUsername(username)


    if(!verification){
        
        return res.status(418).json({message:"user does not exist"})
    }
    req.hashPassword = verification.password;
    req.hashUser = verification.user_id
    
    next()
}

module.exports = {
    checkRegisterContents,
    queryUsernameRegister,
    checkContents,
    checkTypeOf,
    queryUsernameLogin,
}
const jwt = require('jsonwebtoken')

const restrict = () => async(req,res,next) => { 
    try{
        console.log('cookie: ', req.cookies.token)
        console.log('token: ', req.headers.token)

        const token = (req.headers.token ? req.headers.token : req.cookies.token)
        if(!token){
            return res.status(401).json({message:'invalid credentials'})
        }
        jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
            //invalid jwt
            if(err){
                return res.status(401).json({message: "Invalid credentials",})
            }
            //valid jwt
            req.token = decoded
            next();
        })
        

    }catch(err){
        next(err);
    }

}

module.exports = restrict
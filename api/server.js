//Dependencies
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
//Routers
const usersRouter = require('./users/usersRouter');
const authRouter = require('./auth/authRouter')


const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)

server.use('/', (req, res, next) => {
    res.status(200).json({
        message:"Welcome to the API"
    })
})

server.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).json({
        message:"Something went wrong!"
    })
})

module.exports = server

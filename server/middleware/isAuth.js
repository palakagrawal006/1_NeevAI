import cookieParser from "cookie-parser";


import jwt from 'jsonwebtoken';
// import { getToken } from './../utils/token';


// middleware == next  ,, apply in middle of multiple routes/functions
const isAuth = async(req, res , next) =>{
    try {
        let {token} = req.cookies
        if(!token){
            return res.status(400).json({message : "Token is not found"})
        }

        //got token - verify through jwt
        let verifyToken = jwt.verify(token , process.env.JWT_SECRET )
        if(!verifyToken) {
            return res.status(400).json({message : "User does not have valid token"})
        }

        // if verified getToken
        req.userId = verifyToken.userId 
        next()  
        // after that controller is called
    }
     catch (error) {
       return res.status(500).json({ message: "Auth error", error: error.message });


    }
}

export default isAuth
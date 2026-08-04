import jwt from 'jsonwebtoken';

const authMiddleware = async(req,res,next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    const secret = process.env.SECRET_KEY;

    const tokenSplit = authHeader.split(" ");

    try {
        const verify = jwt.verify(tokenSplit[1], secret);
        req.user = verify;
        return next();

    } catch (error) {
        return res.status(403).json({
            message:"Forbidden"
        })
    }
}

export{authMiddleware};
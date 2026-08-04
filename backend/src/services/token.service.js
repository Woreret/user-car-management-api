import jwt from 'jsonwebtoken';

const generateToken = (Uid, Uemail)=>{
    const payload ={
        id: Uid,
        email: Uemail
    }
    const secret = process.env.SECRET_KEY;

    const options = { 
        expiresIn: "1d" 
    };
    return jwt.sign(payload, secret, options);
}
export { generateToken };
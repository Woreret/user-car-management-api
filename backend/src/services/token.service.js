import jwt from 'jsonwebtoken';

const generateToken = (Uid, Uemail, Urole)=>{
    const payload ={
        id: Uid,
        email: Uemail,
        role: Urole
    }
    const secret = process.env.SECRET_KEY;

    const options = { 
        expiresIn: "1d" 
    };
    return jwt.sign(payload, secret, options);
}
export { generateToken };
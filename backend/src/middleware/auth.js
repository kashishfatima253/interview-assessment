import jwt from 'jsonwebtoken'

export default auth = (req,res,next) =>{
    const token = req.header('x-auth-token')

    if(token){
        try {
            jwt.verify(token, process.env.JWT_SECRET,(error,decoded)=>{
                if(error){
                    return res.status(401).json({message:"Invalid token"})
                }
                else{
                    req.user = decoded.user;
                    next();
                }
            })
        } catch (error) {
            console.error('error at auth middleware');
            res.status(500).json({ msg: 'Service unavailable' });
        }
    }
}
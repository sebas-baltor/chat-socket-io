import jwt from "jsonwebtoken";
const middleware = {}

middleware.verifyToken = async (req,res,next)=>{
    try{
        let token = req.header("Authorization") || req.body.token;
        const verify = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = verify;
        next();
    }
    catch(err){
        res.status(401).json({message:err.message})
    }

}
export default middleware;

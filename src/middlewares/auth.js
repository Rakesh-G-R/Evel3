import jwt from 'jsonwebtoken'
export const auth=(req,res,next)=>{
    if(typeof req.headers.authorization==='undefined'){
        return res.status.send('token required');
    }
    const token=req.headers.authorization.split(" ")[1];
    const rest=jwt.verify(token,'rakesh');
    if(!rest){
        return res.status(400).send('token not valid');
    }
    req.user=rest;
    next();
}
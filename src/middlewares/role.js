
export const role=(roles)=>{
   return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return res.status(400).send('not a valid user');
    }
     next();
   }
}
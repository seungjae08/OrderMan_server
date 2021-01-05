const jwt = require("jsonwebtoken");
const {secret} = require("../../config/config");
const { user } = require("../../models");

module.exports={
    post:async (req,res)=>{
        try{
            const {mobile} = req.body 
            const JWT = jwt.verify(req.cookies.accessToken,secret.secret_jwt);
            
            await user.update({mobile:mobile},{
                where:{userId:JWT.userId}
            }).catch(err=>console.log(err))
            
            res.status(200).json({state:true})
        }catch(err){
            res.status(404).send(err)
        }
    }
}
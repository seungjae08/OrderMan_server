const jwt = require("jsonwebtoken");
const { user } = require("../../models");

module.exports={
    post:async (req,res)=>{
        try{
            const {mobile} = req.body 
            const JWT = jwt.verify(req.cookies.accessToken,secret.secret_jwt);
            await user.update({mobile:mobile},{
                where:{userId:JWT.userId}
            })
            res.status(200).send({state:true})
        }catch(err){
            res.status(404).send(err)
        }
    }
}
const jwt = require("jsonwebtoken");
const {secret} = require("../../config/config");
const {user} =require("../../models");
const crypto = require("crypto");

module.exports = {
    post:async (req,res)=>{
        try{
            const JWT = jwt.verify(req.cookies.accessToken,secret.secret_jwt);
            const {password, newPassword} = req.body
            const userData = await user.findOne({
                attributes:["password"],
                where:{
                    userId:JWT.userId,
                }
            })
            const encryptedNow = crypto
            .createHmac("sha256", secret.secret_pw)
            .update(password)
            .digest("base64");

            const encryptedNew = crypto
            .createHmac("sha256", secret.secret_pw)
            .update(newPassword)
            .digest("base64");

            if(userData.password === encryptedNow){
                const update_user= await user.update({password:encryptedNew},{
                    where:{userId:JWT.userId}
                }).catch(err=>console.log(err))
                res.status(200).send({msg : "비밀번호 바꾸기 성공"})
            }else{
                res.status(202).send({msg:"errNowPassword"})
            }
        }catch(err){
            res.status(404).send({err})
        }
    }
};

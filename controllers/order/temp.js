const jwt = require("jsonwebtoken");
const { secret } = require("../../config/config");

module.exports = {
  post: async (req, res) => {
    try{
      const { itemList } = req.body
      const tempToken = jwt.sign(
        { temp: itemList },
        secret.secret_jwt,
        { expiresIn: "7d" }
      );
      // 보내줄 쿠키 만들기
      res.cookie('tempToken', tempToken,{secure:true,sameSite:"none"})
      res.status(200).json({ tempToken: tempToken });
    }catch(err){
      res.status(404).json(err)
    }
  },
  get: async (req, res) => {
    // totalInfo로 옮기기
    // tempToken 유무 분기 필요
    try{
      const { temp } = jwt.verify(req.cookies.tempToken, secret.secret_jwt);

      console.log(temp)
      res.status(200).json({ itemList: temp })
    }
    catch(err){
      if(err.message ==="jwt must be provided"){
        res.status(202).send({itemList:[]})
      }
      else{
        res.status(404).json(err)
      }
    }
   
  }
};

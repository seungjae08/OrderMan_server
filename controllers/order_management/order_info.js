const {
    user,user_order,user_order_item,user_market,
    unknown,unknown_order,unkonwn_order_item,unknown_market,
    item,market,order
} =require("../../models")

module.exports={
    get:async (req,res)=>{
        try{
           let user_order = await user_order.findAll()
            res.send(user_order)
        }catch(err){
            res.send(err)
        }
    },
    post:(req,res)=>{
        try{
            
        }catch(err){

        }
    }
}

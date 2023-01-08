var ordermodel=require("../models/Order")
var {verifyToken }=require("../middlewares/authuntication")
var {chekIsSeller} =require("../middlewares/authorization")
const router = require('express').Router()

router.post('/' ,verifyToken ,async(req ,res ,next) => {
    try{
        var newOrder=req.body
        newOrder.userId=req.user.id
        var Order =await ordermodel.create(newOrder)
        res.status(200).json(Order)
    }
    catch(err){
       res.json(err)
    }
})

router.get('/:id/order' ,async(req ,res ,next) =>{
    var foundedOrder=await ordermodel.findById(req.params.id)
     .populate( 'products' )
    res.json(foundedOrder)
    
})

module.exports=router
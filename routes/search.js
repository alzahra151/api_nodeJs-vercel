const { json } = require("express")
var productModel=require("../models/Products")
const querystring=require("querystring")
let {verifyToken} =require("../middlewares/authuntication")
const router=require('express').Router()

router.get('/' , [verifyToken], async(req ,res , next)=>{
    if (req.query.productName){
        let foundedProduct=await productModel.find({name:req.query.productName })
         res.json(foundedProduct)
    }
    if(req.query.sellerName){
        let allSellers=await productModel.find({sellerId:req.query.sellerName})
        res.send(allSellers)
    }
     
})

module.exports=router
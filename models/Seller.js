var mongoose=require('mongoose')

var sellerSchema=mongoose.Schema({
    name :{
        type :String,
        required :true,
    },
    IsSeller:{
        type:Boolean,
        default:true,
    }
})

var sellerModel=mongoose.model('Seller', sellerSchema)
module.exports=sellerModel
var express=require('express')
var app=express()
const dotenv = require('dotenv')
var mongoose = require('mongoose')
dotenv.config()
mongoose.connect(process.env.DB_URL)
var cors=require('cors')
var productRoute=require("./routes/product")
var userRoute=require("./routes/user")
var sellerRoute=require("./routes/seller")
var orderRoute= require("./routes/order")
var searchRoute= require("./routes/search")
app.use(express.json())
app.use(cors())
app.use('/products' ,productRoute)
app.use('/users' ,userRoute)
app.use('/sellers' ,sellerRoute)
app.use("/orders" ,orderRoute)
app.use('/search' ,searchRoute)







app.listen(3000 ,()=>{
    console.log('app listening on 3000')
})

module.exports=app

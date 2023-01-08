var sellerModel = require("../models/Seller")
var productModel = require("../models/Products")
var {verifyToken }=require("../middlewares/authuntication")
var {chekIsSeller}=require("../middlewares/authorization")
var jwt = require('jsonwebtoken')
const router = require('express').Router()

router.post('/signIn', async (req, res) => {
    let pass = req.body.password
    let seller = await sellerModel.create(req.body)

    let token = jwt.sign(
        { data: { name: req.body.name, id: seller._id ,IsSeller:seller.IsSeller } },
        process.env.jwt_SECRET,
        { expiresIn: '2d' }
    )
    res.status(200).json({
        seller: seller,
        token: token
    })
})

router.post('/login', async (req, res) => {

    let seller = await sellerModel.findOne({ name: req.body.name })
    try {
        console.log(seller)
        if (seller) {
            let token = jwt.sign(
                { data: { name: req.body.name, id: seller._id ,IsSeller:seller.IsSeller} },
                process.env.jwt_SECRET,
                { expiresIn: '2d' }
            )
            res.status(200).json({
                message: 'login successsfull',
                token: token
            })
        } else {
            res.status(500).json({
                message: 'login faild',

            })
        }
    }
    catch (err) {
        res.json(err)
    }
})

router.get('/:id/products',[verifyToken , chekIsSeller], async (req, res, next) => {
    try {
        // let products = await productModel.find({ sellerId: req.params.id })
        let products = await productModel.find({ sellerId: req.user.id })
        res.status(200).json(products)
    } catch (err) {
        res.status(501).json(err)
    }
})
module.exports = router
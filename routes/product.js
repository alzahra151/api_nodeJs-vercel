var productModel = require("../models/Products")
var userModel=require("../models/User")
const router = require('express').Router()
var { verifyToken  } = require("../middlewares/authuntication")
var {chekIsSeller} =require("../middlewares/authorization")
require('dotenv').config()

router.get('/', async (req, res, next) => {
    try {
        let products = await productModel.find({})
        res.status(200).json(products)
        console.log(process.env.jwt_SECRET)
    } catch (err) {
        res.status(501).json(err)
    }
})

router.post('/', [verifyToken , chekIsSeller], async (req, res, next) => {
    try {
      
            let product = req.body
            let newProduct = await productModel.create(product)
            res.status(200).json(newProduct)

    }
    catch (err) {
        res.status(500).json(err)
    }
})

router.get('/:id', async (req, res, nextt) => {
    let productId = req.params.id
    try {
        let foundedProduct = await productModel.findById(productId)
        res.status(200).json(foundedProduct)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

router.patch('/:id', [verifyToken ,chekIsSeller], async (req, res, next) => {
    try {
        let productId = req.params.id
        let updatedProduct = req.body.name
        let product = await productModel.findById(productId)
        if (req.user.id == product.sellerId) {
            console.log(product.sellerId)
            product.name = updatedProduct

            product.save()
            res.json(product)
        } else {
            res.json('you not allowed to update this product')
        }

    }
    catch (err) {
        res.json(err)
    }
})

router.delete('/:id', [verifyToken ,chekIsSeller], async (req, res) => {
    try {
        let productId = req.params.id
        let product = await productModel.findById(productId)
        if (req.user.id == product.sellerId) {
            console.log(product.sellerId)
            product.remove()
            res.json('deleted successfully')

        } else {
            res.json('you not allowed to delete this product')
        }
    } catch (err) {
        res.json('error')
    }
})
module.exports = router

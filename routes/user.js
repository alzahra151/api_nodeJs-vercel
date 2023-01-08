var userModel = require("../models/User")
var {verifyToken}=require("../middlewares/authuntication")
var {userRolles}=require("../middlewares/authorization")
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

const router = require('express').Router()

router.post('/signIn', async (req, res) => {
    let pass = req.body.password
    let user = await userModel.create(req.body)
    let token = jwt.sign(
        { data: { username: req.body.username, id: user._id  } },
        process.env.jwt_SECRET,
        { expiresIn: '2d' }
    )
    res.status(200).json({
        user: user,
        token: token
    })
})

router.post('/login', async (req, res) => {
    let user = await userModel.findOne({ username: req.body.username })
    try {
        if (user) {
            console.log(user)
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (err) {
                    res.json(err)
                }
                if (result) {
                    let token = jwt.sign(
                        { data: { username: req.body.username, id: user._id } },
                        process.env.jwt_SECRET,
                        { expiresIn: '2d' }
                    )
                    res.status(200).json({
                        message: 'login successfuly',
                        user: user,
                        token: token
                    })
                } else {
                    res.status(500).json({
                        message: 'password incorect'
                    })
                }
            })
        }
        else {
            res.json('not found')
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})

router.patch('/:id',[verifyToken , userRolles] ,async (req ,res) => {
        const salt = bcrypt.genSaltSync(10);
        const hashed= bcrypt.hashSync(req.body.password, salt);
        req.body.password= hashed
         let user= await userModel.findByIdAndUpdate(req.params.id ,req.body,{new :true})
        res.json(user)
})
router.delete('/:id' , [verifyToken , userRolles] ,async(req ,res )=>{
    let userId=req.params.id
    await userModel.findByIdAndRemove(userId)
    res.json('deleted successfully')
})


module.exports = router
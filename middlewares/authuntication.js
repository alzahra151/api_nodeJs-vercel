let jwt=require('jsonwebtoken')
function verifyToken(req ,res ,next){
  let token =req.headers.token
    jwt.verify(token ,process.env.jwt_SECRET ,function(err ,decoded){
        if(decoded){
            req.user=decoded.data
            console.log(req.user.id)
            next()
           }
       if(err){
           res.status(500).json({message:'token expired'})
       }
    })
}
module.exports={verifyToken }
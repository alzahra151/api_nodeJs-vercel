
function chekIsSeller(req ,res ,next){
   if(req.user.IsSeller){
       next()
   }else{
    return res.status(501).json('you are not seller you not allowed')
   }
}

// userRolles
function userRolles(req ,res , next){
    if(req.user.id==req.params.id){
        next()
    }
    else{
        res.json('you not allow to change info')
    }
}

module.exports={ chekIsSeller ,userRolles}
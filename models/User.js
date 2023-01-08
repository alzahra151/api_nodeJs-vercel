var mongoose= require('mongoose')
var bcrypt=require('bcryptjs')
var userScemah=mongoose.Schema({
    username:{
        type:String,
        required:true,
        maxlength: 15,
        minLength:5,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:5,
    },
    IsSeller:{
        type:Boolean,
        default:false,
    }

})

userScemah.pre("save", function (next) {

    const salt = bcrypt.genSaltSync(10);
    const hashed= bcrypt.hashSync(this.password, salt);
    this.password = hashed
 
    next()
 })
 userScemah.pre("findByIdAndUpdate", function (next) {

    const salt = bcrypt.genSaltSync(10);
    const hashed= bcrypt.hashSync(this.password, salt);
    this.password = hashed
 
    next()
 })

var userModel=mongoose.model('User' ,userScemah)
module.exports=userModel
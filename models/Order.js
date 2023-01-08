var mongoose = require('mongoose')
var orderSchema = mongoose.Schema({
    createAt: Date,
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    products:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    }]
    

})
var ordermodel = mongoose.model('Order', orderSchema)
module.exports = ordermodel
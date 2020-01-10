const mongoose=require('mongoose');
const ProductSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        min:3,
        trim:true
    },
    price:{
        type: Number,
        required: true,
        minlength:1,
        trim: true
    },
    productImage:{
        type:String
    }
});

module.exports = mongoose.model('Product',ProductSchema);

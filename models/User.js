const mongoose = require('mongoose');
const {Schema} =  mongoose;

const userSchema = new Schema({
    email:String,
    password: String,
    name:String,
    age: Number
});

module.exports = mongoose.model('authdetails',userSchema);
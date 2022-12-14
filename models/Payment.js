const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const {Schema} =  mongoose;

const paymentSchema = new Schema({
    lastpayment: Date,
    lastchanged: Date,
    userId: ObjectId,
    timeslot:Number
});

module.exports = mongoose.model('paymentdetail',paymentSchema);
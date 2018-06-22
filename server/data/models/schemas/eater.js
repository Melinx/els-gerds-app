
const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const Payment = require('./payment')
const Order = require('./order')

module.exports = new Schema({
    
    name: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        lowercase: true,
    },

    password: {
        type: String,
        required: true        
    },

    yearOfBirth: {
        type: Number,
        min: 1920,
        max: 2018
    },

    gender: {
        type: String,
        enum: ['M', 'F', 'U'],
    },

    payment: {
        type: ObjectId,
        ref: 'Payment'
    },

    orders: [{
        type: ObjectId,
        ref: 'Order'
    }],

    pastOrders: [{
        type: ObjectId,
        ref: 'Order'
    }]

})

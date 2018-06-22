
const { Schema, Schema: { ObjectId } } = require('mongoose')
const Course = require('./course')

module.exports = new Schema({

    eaterId: {
        type: ObjectId,
        ref: 'Eater',
        required: true
    },

    date: { 
        type: String, 
        required: true
    },

    firstCourse: {
        type: ObjectId,
        ref: 'Course',
        required: true
    },

    secondCourse: {
        type: ObjectId,
        ref: 'Course',
        required: true,
    },

    pickupTime: { type: String },

    statusPaid: {
        type: Boolean,
        default: false
    }

})



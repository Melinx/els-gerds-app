const mongoose = require('mongoose')
const { Course } = require('./schemas')

module.exports = mongoose.model('Course', Course)
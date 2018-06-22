const mongoose = require('mongoose')
const { Payment } = require('./schemas')

module.exports = mongoose.model('Payment', Payment)
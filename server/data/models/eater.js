const mongoose = require('mongoose')
const { Eater } = require('./schemas')

module.exports = mongoose.model('Eater', Eater)
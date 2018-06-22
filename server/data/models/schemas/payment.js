
const { Schema } = require('mongoose')

module.exports = new Schema({
    cardHolderName: {
        type: String,
        required: true
    },
    
    cardHolderLastName: {
        type: String,
        required: true
    },

    cardNumber: {
        type: String,
        length: 16,
        required: true
    },
    
    expirationDate: {
        type: String,
        required: true
    }

})
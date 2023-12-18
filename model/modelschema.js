const mongoose = require('mongoose')
const Schema = mongoose.Schema


const daySchema = new Schema({
    day: {
        type: String,
        required: true
    },

    planet: { 
            type: String,
            required: true

    },
    stone:{
        type: String,
        required:true
    },

    imageofstone:{
        type: String,
        required:true
    },
    healingProperties:{
        type: String,
        required:true
    },

    stoneMeaning:{
        type: String,
        required:true
    }

})

const day = mongoose.model('days', daySchema)

module.exports = day
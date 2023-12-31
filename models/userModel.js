const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({

    name:{
        type: String
    },
    isActive:{
         type: Boolean
    }
})

const test = mongoose.model('user4', userSchema)
module.exports = test
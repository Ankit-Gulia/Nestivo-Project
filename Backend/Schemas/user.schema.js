
const mongoose = require('mongoose');
const {Schema} = require('mongoose');


const userSchema = new Schema({
    full_name : {
        type : String,
        required : true
    },
    email : {
        type: String,
        unique: true,
        required: true
    },
    phone : {
        type: String,
        unique: true,
        required: true
    },

    password : {
        type : String,
        required : true
    },
});

module.exports = userSchema;
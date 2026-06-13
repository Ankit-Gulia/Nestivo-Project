
const userSchema = require('../Schemas/user.schema');
const {model} = require("mongoose");

module.exports = new model('User', userSchema);
 
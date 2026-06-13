
const {model} = require('mongoose');
const propertySchema =  require('../Schemas/property.schema');

module.exports = new model('Property', propertySchema);

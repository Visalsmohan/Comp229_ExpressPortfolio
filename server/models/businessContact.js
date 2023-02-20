let mongoose = require('mongoose')
//create a model class
let businessContactModel = mongoose.Schema({
contactName : String,
contactNo : String,
email : String,
address : String
},
{
    collection : "businessContacts"
});
module.exports = mongoose.model('BusinessContact',businessContactModel)
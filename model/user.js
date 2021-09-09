const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email : {
		type: String,
		unique: true,
		required: true,
	},
	name : {
		type: String,
		required: true,
	},
	phone: {
		type: String,
        unique: true
	},
    groups : 
    { type : Array ,
     "default" : [] 
    }

}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);
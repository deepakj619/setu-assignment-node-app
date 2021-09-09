const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
	name : {
		type: String,
		required: true,
        unique: true
	},
	description: {
		type: String
	},
    group_id: {
		type: mongoose.Schema.Types.ObjectId,
	},
    bills : 
    { type : Array ,
     "default" : [] 
    }

}, {timestamps: true});

module.exports = mongoose.model('Group', GroupSchema);
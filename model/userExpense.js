const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserExpenseSchema = new Schema({
	user_id : {
		type: String,
		required: true,
	},
    bill_id:{
        type: String,
        required: true,
    },
    outstanding_amount: {
        type: Number,
        required: true,
    }

}, {timestamps: true});

module.exports = mongoose.model('UserExpenseSchema', UserExpenseSchema);
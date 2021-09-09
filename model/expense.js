const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
	name : {
		type: String,
		required: true,
        unique: true
	},
	totalAmount: {
		type: Number,
        required: true,
	},
    outstanding_amount: {
        type: Number
    },
    bill_type : 
    {   type: String,
	    required: true,
    },
    no_of_owed_users:{
		type: Number
	},
    who_paid : 
    {   type: String,
        required: true,
    },
    bill_group:
    {   type: String,
        required: true,
    }

}, {timestamps: true});

module.exports = mongoose.model('Expense', ExpenseSchema);
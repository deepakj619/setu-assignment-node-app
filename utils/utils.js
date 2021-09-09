const User = require('../model/user');
const UserExpense = require('../model/userExpense');
const Expense = require('../model/expense');


let getUserByEmail = async (email) => {
    const existingUser = await User.findOne({ email: email }).lean().exec();
    return existingUser;
};

let getUserByPhone = async (phone) => {
    const existingUser = await User.find({ phone: phone }).lean().exec();
    return existingUser;
};

let createExpense = async (options) => {

    const userExpense = new Expense(options);
    const createdExpense = await userExpense.save();
    return createdExpense._id;
};

module.exports = {
	getUserByEmail,
    getUserByPhone,
    createExpense
};
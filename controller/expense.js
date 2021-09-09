const Expense = require('../model/expense');
const Utils = require("../utils/utils");
const UserExpense = require('../model/userExpense');


const createExpense = async (req, res) => {

	try {
        const supportedBillTypes = ["EQUAL","EXACT","PERCENT"];
        const totalAmount = req.body.amount;
        const paidUser = req.body.whoPaid;
        const billType = req.body.expenseType;
        const owedUsers = req.body.owedUsers;
        const noOfowedUsers = owedUsers.length;
        const groupName = req.body.expenseGroupName;
        const billName = req.body.billName;

        console.log(JSON.stringify(req.body));

        if(totalAmount<=0 || totalAmount == undefined || paidUser == undefined || billType == undefined || owedUsers==null || owedUsers.length == 0 ||  groupName == undefined){

            return res.status(500).json({
				message: 'Invalid input provided..'
            });
        }
        if(supportedBillTypes.includes(billType)){ 
              
            if(billType == 'EQUAL'){

                 let billOptions = {};
                 billOptions.name = billName;
                 billOptions.totalAmount = totalAmount;
                 billOptions.bill_type = billType;
                 billOptions.who_paid  = paidUser;
                 billOptions.outstanding_amount = totalAmount;
                 billOptions.no_of_owed_users = noOfowedUsers;
                 billOptions.bill_group = groupName;

                 let expenseBillId = await Utils.createExpense(billOptions);
                 let share = totalAmount/noOfowedUsers;

                 for(let user of owedUsers){
                     let userEmail = user.email;
                     let userPhone = user.phone;
                     if (userPhone){
                        const existingUser = await Utils.getUserByPhone(userPhone);
                        if(existingUser){
                            let id = existingUser._id;
                            const userExpense = new UserExpense({
                                user_id: id,
                                bill_id: expenseBillId,
                                outstanding_amount: share
                            });
                            const result = await userExpense.save();
                            console.log(result);
                        } 
                    }
                    else if (userEmail)
                    {   
                        const existingUser = await Utils.getUserByEmail(userEmail);
                        if(existingUser){
                            let id = existingUser._id;
                            console.log(id);
                            const userExpense = new UserExpense({
                                user_id: id,
                                bill_id: expenseBillId,
                                outstanding_amount: share
                            });
                            const result = await userExpense.save();
                            console.log(result);
                            
                        }
                    }
                 }
                 return res.status(200).json({
                    message: 'User added to Group.',
                    status: 200
                });	

            }
            else if(billType == 'EXACT'){

                let billOptions = {};
                billOptions.name = billName;
                billOptions.totalAmount = totalAmount;
                billOptions.bill_type = billType;
                billOptions.who_paid  = paidUser;
                billOptions.outstanding_amount = totalAmount;
                billOptions.no_of_owed_users = noOfowedUsers;
                billOptions.bill_group = groupName;
                let expenseBillId = await Utils.createExpense(billOptions);

                for(let user of owedUsers){
                    let userEmail = user.email;
                    let userPhone = user.phone;
                    let share = user.amount;
                    if (userPhone){
                       const existingUser = await Utils.getUserByPhone(userPhone);
                       if(existingUser){
                           let id = existingUser._id;
                           const userExpense = new UserExpense({
                               user_id: id,
                               bill_id: expenseBillId,
                               outstanding_amount: share
                           });
                           const result = await userExpense.save();
                           console.log(result);
                       }
                       
                   }
                   else if (userEmail)
                   {   
                       const existingUser = await Utils.getUserByEmail(userEmail);
                       if(existingUser){
                           let id = existingUser._id;
                           console.log(id);
                           const userExpense = new UserExpense({
                               user_id: id,
                               bill_id: expenseBillId,
                               outstanding_amount: share
                           });
                           const result = await userExpense.save();
                           console.log(result);
                           
                       }
                   }
                }
                return res.status(200).json({
                   message: 'Bill Created Succesully..',
                   status: 200
               });	

           }
           else if(billType == 'PERCENT'){
            let billOptions = {};
            billOptions.name = billName;
            billOptions.totalAmount = totalAmount;
            billOptions.bill_type = billType;
            billOptions.who_paid  = paidUser;
            billOptions.outstanding_amount = totalAmount;
            billOptions.no_of_owed_users = noOfowedUsers;
            billOptions.bill_group = groupName;
            let expenseBillId = await Utils.createExpense(billOptions);

            for(let user of owedUsers){
                let userEmail = user.email;
                let userPhone = user.phone;
                if (userPhone){
                   const existingUser = await Utils.getUserByPhone(userPhone);
                   if(existingUser){
                       let id = existingUser._id;
                       let percentageShare = user.percent;
                       console.log(percentageShare)
                       let share = (percentageShare / 100) * totalAmount;
                       const userExpense = new UserExpense({
                           user_id: id,
                           bill_id: expenseBillId,
                           outstanding_amount: share
                       });
                       const result = await userExpense.save();
                       console.log(result);
                   }
                   
               }
               else if (userEmail)
               {   
                   const existingUser = await Utils.getUserByEmail(userEmail);
                   if(existingUser){
                       let id = existingUser._id;
                       let percentageShare = user.percent;
                       console.log(percentageShare)
                       let share = (percentageShare / 100) * totalAmount;
                       const userExpense = new UserExpense({
                           user_id: id,
                           bill_id: expenseBillId,
                           outstanding_amount: share
                       });
                       const result = await userExpense.save();            
                   }
               }
            }
            return res.status(200).json({
               message: 'Bill Created Succesully..',
               status: 200
           });	

       }
        }
        
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: err
		});
	}
};


const payBill = async (req, res) => {
	try {
        const bill_id = req.body.bill_id;
        const user_id = req.body.user_id;
        const amount = req.body.amount
        await UserExpense.updateOne({ $and: [ { bill_id: bill_id }, { user_id: user_id } ] }, {$inc: { outstanding_amount: -amount}}).exec();
        await Expense.updateOne({ bill_id: bill_id }, {$inc: { outstanding_amount: -amount}}).exec();
        return res.status(200).json({
            message: 'Bill Paid Successfuly..',
            status: 200
        });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: err
		});
	}
};


const getBill = async (req, res) => {
	try {
        const bill_id = req.query.bill_id;
        const bill = await Expense.findOne({ _id: bill_id }).lean().exec();
        if(bill){
            return res.status(200).json({
                status: 200,
                bill_details: bill
            });
        }
        else{
            return res.status(409).json({
                status: 409,
                message: 'Please provide valid bill id.'
            });
        }
        
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: err
		});
	}
};

module.exports = {
	createExpense,
    payBill,
    getBill
};
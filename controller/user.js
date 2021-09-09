const User = require('../model/user');
const Group = require('../model/group');
const Utils = require("../utils/utils");

const createUser = async (req, res) => {
	try {
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;

        //Check existing user in DB by email or phone.
        let existingUser = null;
        if(email!=null){
            existingUser= await Utils.getUserByEmail(email);

        }
        else if(phone!=null){
            existingUser= await Utils.getUserByPhone(phone);
        }
        console.log(existingUser);

		if (existingUser) {
			return res.status(409).json({
				status: 409,
				message: 'User already exists..'
			});
		}
		const user = new User({
			name: name,
			phone: phone,
            email: email
		});
		const result = await user.save();
		res.status(201).json({
			message: 'User created',
			id: result._id,
            userId: result.userId,
			name: result.name,
			status: 200
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: err
		});
	}
};


const getUser = async (req, res) => {
	try {
        const email = req.query.email;
        const phone = req.query.phone;

        //Check existing user in DB by email or phone.
        const existingUser = await User.findOne({ $or: [{ phone: phone }, { email: email }] }).exec();
		if (existingUser) {
            return res.status(200).json({
                message: 'User Found',
                name: existingUser.name,
                status: 200
            });	
		}
        return res.status(409).json({
            status: 409,
            message: 'User already exists..'
        });
		
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: err
		});
	}
};


const addUserToGroup = async (req, res) => {
	try {
        const groupName = req.body.groupName;
        const emailAddress = req.body.email;
        const phoneNumber = req.body.phone;
    
        const existingGroup = await Group.find({ name: groupName }).exec();
        if (existingGroup.length == 1 ) {
            
            if (phoneNumber){
                await User.updateOne({phone: phoneNumber}, { $addToSet: { groups: [groupName] } },).exec();
                return res.status(200).json({
                    message: 'User added to Group.',
                    status: 200
                });	
            }
            else if (emailAddress)
            {
                await User.updateOne({email: emailAddress}, { $addToSet: { groups: [groupName] } },).exec();
                return res.status(200).json({
                    message: 'User added to Group.',
                    status: 200
                });
            }
            else{
                return res.status(409).json({
                    status: 409,
                    message: 'Please provide valid phone number or email to add the user.'
                });
            }
		}
        else{
            return res.status(409).json({
                status: 409,
                message: 'No Group Exists with the given name..'
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
	createUser,
    getUser,
    addUserToGroup
};
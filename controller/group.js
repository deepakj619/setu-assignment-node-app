const Group = require('../model/group');


const createGroup = async (req, res) => {
	try {
        const groupName = req.body.name;
        const groupDescription = req.body.description;

        //Check existing user in DB by email or phone.
        const existingGroup = await Group.find({ name: groupName }).exec();
		if (existingGroup.length >=1 ) {
			return res.status(409).json({
				status: 409,
				message: 'Group already exists. Please try with a different name.'
			});
		}
		const group = new Group({
			name: groupName,
			description: groupDescription,
		});
		const result = await group.save();
		res.status(201).json({
			message: 'Group created',
			group_id: result._id,
			group_name: result.name,
			status: 200
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: err
		});
	}
};


const getGroup = async (req, res) => {
	try {
        const groupName = req.query.name;
        //Check existing group in DB by name.
        const existingGroup = await Group.find({ name: groupName }).exec();
		if (existingGroup.length == 1 ) {
            return res.status(200).json({
                message: 'Group Found',
                name: existingGroup[0].name,
                status: 200
            });	
		}
        return res.status(404).json({
            status: 404,
            message: 'Group not found..'
        });
		
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: err
		});
	}
};

module.exports = {
	createGroup,
    getGroup
};
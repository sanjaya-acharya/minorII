const Users = require('../../models/Users');

const customers = async (req, res) => {
    try {
        const users = await Users.find();
        const formattedUsers = users.map((user) => ({
            fullname: user.fullname,
            userID: user._id, // Assuming MongoDB generates the userID
            active: user.active,
            action: user.active ? 'Suspend' : 'Remove Suspension',
        }));
        res.json(formattedUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports = { customers };

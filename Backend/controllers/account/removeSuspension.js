const Users = require('../../models/Users');

const removeSuspension = async (req, res) => {
    const { userID } = req.body;

    try {
        const user = await Users.findOne({_id: userID});

        if (!user) {
            return res.status(200).json({ message: 'User not found' });
        }

        // Remove suspension
        user.active = true;
        user.message = '';
        await user.save();

        return res.status(200).json({ message: 'Suspension removed successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { removeSuspension };

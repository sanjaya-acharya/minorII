const Users = require('../../models/Users');

const suspendUser = async (req, res) => {
    const { email, message } = req.body;

    try {
        // Find the user by email
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(200).json({ message: 'User not found' });
        }

        // Suspend the user
        user.active = false;
        user.message = message;
        await user.save();

        return res.status(200).json({ message: 'User suspended successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { suspendUser };

const Users = require("../../models/Users")

const updatePassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await Users.findOne({ email: email });

        if (!user) {
            return res.status(200).json({ message: 'User not found' });
        }

        user.password = md5(newPassword);
        await user.save();

        return res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { updatePassword }
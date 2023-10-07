const Users = require("../../models/Users")

const changePassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
        const user = await Users.findOne({ email: email });

        if (!user) {
            return res.status(200).json({ message: 'User not found' });
        }

        if (user.password !== md5(oldPassword)) {
            return res.status(200).json({ message: 'Incorrect old password' });
        }

        user.password = md5(newPassword);
        await user.save();

        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { changePassword }
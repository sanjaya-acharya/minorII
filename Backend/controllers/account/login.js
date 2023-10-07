const Users = require("../../models/Users");
const md5 = require("md5");

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await Users.findOne({ email: email });

        if (!user) {
            return res.status(200).json({ loginStatus: false, message: 'Email not registered' });
        } else if (!user.active) {
            return res.status(200).json({ loginStatus: false, message: 'Account is not active' })
        }

        const hashedPassword = md5(password);

        if (user.password === hashedPassword) {
            return res.status(200).json({ loginStatus: true, message: 'Login successful' });
        } else {
            return res.status(200).json({ loginStatus: false, message: 'Invalid Password' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ loginStatus: false, message: 'Internal server error' });
    }
};

module.exports = { login }
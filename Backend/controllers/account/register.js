const Users = require("../../models/Users");
const md5 = require("md5");

const register = async (req, res) => {
    const { fullname, email, password } = req.body;

    try {
        // Check if the email already exists
        const user = await Users.findOne({ email: email });

        if (user) {
            return res.json({
                registerStatus: false,
                message: "Email already exists",
            });
        }

        // Create a new user document
        const newUser = new Users({
            fullname: fullname,
            email: email,
            password: md5(password),
            points: 0,
            active: true, // should verify email to be active
            message: "Email not verified"  // should verify email to be active
        });

        await newUser.save();

        res.json({
            registerStatus: true,
            message: "Account registered successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { register };
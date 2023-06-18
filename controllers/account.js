const Users = require('../models/Users')
const md5 = require('md5')

const register = (req, res) => {
    const { fullname, email, password } = req.body;

    Users.findOne({ email: email })
    .then(user => {
        if (user) {
            res.json({
                registerStatus: false,
                message: 'Email already exists'
            });
        } else {
            // Create a new user document
            const newUser = new Users({
                fullname: fullname,
                email: email,
                password: md5(password), // encryption
                balance: 0,
                points: 0
            });

            newUser.save()
                .then(() => {
                    res.json({
                        registerStatus: true,
                        message: 'Account registered successfully'
                    });
                })
                .catch(error => {
                    res.status(500).json({ error: 'Internal Server Error' });
                });
        }
    })
    .catch(error => {
        res.status(500).json({ error: 'Internal Server Error' });
    });
}

const login = (req, res) => {
    const { email, password } = req.body;

    Users.findOne({ email: email })
    .then(user => {
        if (!user) {
            res.status(200).json({ loginStatus: false, message: 'Invalid email or password' });
            return;
        }

        const hashedPassword = md5(password);

        if (user.password === hashedPassword) {
            res.status(200).json({ loginStatus: true, message: 'Login successful' });
        } else {
            res.status(200).json({ loginStatus: false, message: 'Invalid email or password' });
        }
    })
    .catch(error => {
        res.status(500).json({ loginStatus: false, message: 'Internal server error' });
    })
}

const loadInfo = (req, res) => {
    const {email} = req.body;
    Users.findOne({ email: email })
    .then(user => {
        if (!user) {
            res.status(200).json({ loginStatus: false, message: 'Invalid email or password' });
            return;
        }
        res.status(200).json({fullname: user.fullname, email: user.email, points: user.points, balance: user.balance})
    })
    .catch(error => {
        res.status(500).json({ loginStatus: false, message: 'Internal server error' });
    })

}

const deleteUser = (req, res) => {
    const { email } = req.body;

    Users.findOneAndDelete({ email: email })
    .then(user => {
        if (!user) {
            res.status(200).json({ message: 'User not found' });
        } else {
            res.status(200).json({ message: 'User deleted successfully' });
        }
    })
    .catch(error => {
        res.status(500).json({ error: 'Internal Server Error' });
    });
};

const changePassword = (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
    Users.findOne({ email: email })
    .then(user => {
        if (!user) {
            res.status(200).json({ message: 'User not found' });
        } else {
            // Verify the old password
            if (user.password !== md5(oldPassword)) {
                res.status(200).json({ message: 'Incorrect old password' });
            } else {
                // Update the password with the new password
                user.password = md5(newPassword);
                user.save()
                .then(() => {
                    res.status(200).json({ message: 'Password changed successfully' });
                })
                .catch(error => {
                    res.status(500).json({ error: 'Internal Server Error' });
                });
            }
        }
    })
    .catch(error => {
        res.status(500).json({ error: 'Internal Server Error' });
    });
};

module.exports = {register, login, loadInfo, deleteUser, changePassword}
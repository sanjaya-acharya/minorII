const Users = require("../../models/Users");
const md5 = require("md5");

const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT;
const LOGIN_SECRET_KEY = process.env.LOGIN_SECRET_KEY;
const TOKEN_REFRESH_KEY = process.env.TOKEN_REFRESH_KEY;

app.use(bodyParser.json());

const generateAuthToken = (userID) => {
    // Generate an access token
    const accessToken = jwt.sign({ user: userID }, LOGIN_SECRET_KEY, { expiresIn: '15m' });

    // Generate a refresh token
    const refreshToken = jwt.sign({ user: userID }, TOKEN_REFRESH_KEY, { expiresIn: '15m' });

    return { accessToken, refreshToken };
}

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return res.json({ error: "You are not Authorised" })
    }

    // if user passes token, verify it
    jwt.verify(token, process.env.LOGIN_SECRET_KEY, (error, user) => {
        if (error) {
            return res.json({ error: "You are not Authorised" });
        }

        // Set the user on the request object for later use
        req.user = user;
        // Call the next middleware or route handler
        next();
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email: email });

        if (!user) {
            return res.status(200).json({ loginStatus: false, message: 'Email not registered' });
        } else if (!user.active) {
            return res.status(200).json({ loginStatus: false, message: 'Account is not active' })
        }

        const hashedPassword = md5(password);

        if (user.password === hashedPassword) {
            // Login successful
            // Generate and send tokens to the client
            const { accessToken, refreshToken } = generateAuthToken(user.userID);
            return res.status(200).json({ loginStatus: true, message: 'Login successful', userID: user._id, accessToken, refreshToken });
        } else {
            return res.status(200).json({ loginStatus: false, message: 'Invalid Password' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ loginStatus: false, message: 'Internal server error' });
    }
};

const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;

    try {
        const user = await verifyToken(refreshToken, TOKEN_REFRESH_KEY);

        // If refresh token is valid, generate a new access token
        const accessToken = jwt.sign({ email: user.email }, LOGIN_SECRET_KEY, { expiresIn: '30m' });

        return res.status(200).json({ accessToken });
    } catch (error) {
        console.error(error);
        return res.status(403).json({ error: 'Invalid refresh token.' });
    }
};

module.exports = { login, refreshAccessToken, authenticateUser };

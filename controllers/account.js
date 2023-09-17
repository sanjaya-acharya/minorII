const Users = require("../models/Users");
const Otp = require("../models/Otp");
const md5 = require("md5");

const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path")

const dotenv = require("dotenv");
dotenv.config();

const register = (req, res) => {
    const { fullname, email, password } = req.body;

    Users.findOne({ email: email })
        .then((user) => {
            if (user) {
                res.json({
                    registerStatus: false,
                    message: "Email already exists",
                });
            } else {
                // Create a new user document
                const newUser = new Users({
                    fullname: fullname,
                    email: email,
                    password: md5(password), // encryption
                    points: 0,
                });

                newUser
                    .save()
                    .then(() => {
                        res.json({
                            registerStatus: true,
                            message: "Account registered successfully",
                        });
                    })
                    .catch((error) => {
                        res.status(500).json({ error: "Internal Server Error" });
                    });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "Internal Server Error" });
        });
};

const login = (req, res) => {
    const { email, password } = req.body;

    Users.findOne({ email: email })
        .then((user) => {
            if (!user) {
                res
                    .status(200)
                    .json({ loginStatus: false, message: "User does not exist" });
            } else {
                const hashedPassword = md5(password);

                if (user.password === hashedPassword) {
                    res
                        .status(200)
                        .json({ loginStatus: true, message: "Login successful" });
                } else {
                    res
                        .status(200)
                        .json({ loginStatus: false, message: "Invalid email" });
                }
            }
        })
        .catch((error) => {
            res
                .status(500)
                .json({ loginStatus: false, message: "Internal server error" });
        });
};

const loadInfo = (req, res) => {
    const { email } = req.body;
    Users.findOne({ email: email })
        .then((user) => {
            if (!user) {
                res
                    .status(200)
                    .json({ loginStatus: false, message: "Invalid email or password" });
                return;
            }
            res.status(200).json({
                fullname: user.fullname,
                email: user.email,
                points: user.points,
            });
        })
        .catch((error) => {
            res
                .status(500)
                .json({ loginStatus: false, message: "Internal server error" });
        });
};

const deleteUser = (req, res) => {
    const { email } = req.body;

    Users.findOneAndDelete({ email: email })
        .then((user) => {
            if (!user) {
                res.status(200).json({ message: "User not found" });
            } else {
                res.status(200).json({ message: "User deleted successfully" });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "Internal Server Error" });
        });
};

const changePassword = (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
    Users.findOne({ email: email })
        .then((user) => {
            if (!user) {
                res.status(200).json({ message: "User not found" });
            } else {
                // Verify the old password
                if (user.password !== md5(oldPassword)) {
                    res.status(200).json({ message: "Incorrect old password" });
                } else {
                    // Update the password with the new password
                    user.password = md5(newPassword);
                    user
                        .save()
                        .then(() => {
                            res
                                .status(200)
                                .json({ message: "Password changed successfully" });
                        })
                        .catch((error) => {
                            res.status(500).json({ error: "Internal Server Error" });
                        });
                }
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "Internal Server Error" });
        });
};

const updatePassword = (req, res) => {
    const { email, newPassword } = req.body;
    Users.findOne({ email: email })
        .then((user) => {
            if (!user) {
                res.status(200).json({ message: "User not found" });
            } else {
                // Update the password with the new password
                user.password = md5(newPassword);
                user
                    .save()
                    .then(() => {
                        res
                            .status(200)
                            .json({ message: "Password has been reset successfully" });
                    })
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "Internal Server Error" });
        });
};

const sendOTP = async (req, res) => {
    const { email } = req.body;

    // Generate an 8-character OTP with digits and alphabets
    const otp = otpGenerator.generate(6, {
        digits: true,
        alphabets: true,
        specialChars: false,
    });

    // Set the OTP expiry time (2 minutes from now)
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 2);

    // Try to find an existing OTP document for the email
    const existingOtp = await Otp.findOne({ email });

    if (existingOtp) {
        // If an OTP document already exists for the email, update it
        await Otp.updateOne({ email }, { otp, expiry, used: false });
    } else {
        // If no OTP document exists, create a new one
        const newOtp = new Otp({
            otp,
            email,
            expiry,
            used: false,
        });
        await newOtp.save();
    }

    // At this point, the OTP has been generated or updated for the email

    // Send this OTP to the user through email
    // Create a transporter object using your email service's SMTP settings
    const transporter = nodemailer.createTransport({
        service: "gmail", // e.g., 'gmail', 'yahoo', etc.
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    const templatePath = path.join(__dirname, "\\otp-template.html")
    // Read the HTML template file and export it as a string
    const otpTemplate = fs.readFileSync(templatePath, 'utf8');

    // Replacing placeholder in html file
    const emailContent = otpTemplate.replace('{{otp}}', otp);

    // Define the email content
    const mailOptions = {
        from: process.env.GMAIL_USERNAME,
        to: email, // Recipient's email address
        subject: "Otp for password reset", // Email subject
        html: emailContent // Email content
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).json({ message: "couldn't sent otp to the email" + error });
        } else {
            res.status(500).json({ otp, message: "otp sent to the email" });
        }
    });

};

const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Find the OTP record in the database
        const otpRecord = await Otp.findOne({ email });

        if (!otpRecord) {
            return res.status(404).json({ message: 'OTP not found for the provided email.' });
        }

        // Check if the OTP has expired
        if (otpRecord.expiry <= new Date()) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new OTP.' });
        }

        // Check if the OTP has already been used
        if (otpRecord.used) {
            return res.status(400).json({ message: 'OTP has already been used.' });
        }

        // Check if the provided OTP matches the OTP in the database
        if (otp !== otpRecord.otp) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        // Mark the OTP as used
        otpRecord.used = true;
        await otpRecord.save();

        return res.status(200).json({ message: 'OTP verified successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = { register, login, loadInfo, deleteUser, changePassword, sendOTP, verifyOTP, updatePassword };

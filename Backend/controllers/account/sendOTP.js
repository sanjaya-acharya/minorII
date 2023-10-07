const Otp = require('../../models/Otp');
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const sendOTP = async (req, res) => {
    const { email, reason } = req.body;

    try {
        // Try to find an existing OTP document for the email
        const existingOtp = await Otp.findOne({ email });

        // Check if an existing OTP document exists and is not expired
        if (existingOtp && existingOtp.expiry > new Date()) {
            return res.status(400).json({ message: 'Try again later' });
        }

        // Generate an 8-character OTP with digits and alphabets
        const otp = otpGenerator.generate(8, {
            digits: true,
            alphabets: true,
            specialChars: false,
        });

        // Set the OTP expiry time (2 minutes from now)
        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 2);

        if (existingOtp) {
            // If an OTP document already exists for the email and is expired,
            // update it
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

        // Here, OTP has been saved in the database. Now, send this OTP to the user through email

        // Create a transporter object using your email service's SMTP settings
        const transporter = nodemailer.createTransport({
            service: "gmail", // e.g., 'gmail', 'yahoo', etc.
            auth: {
                user: process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_PASSWORD,
            },
        });

        const templatePath = path.join(__dirname, "otp-template.html");
        // Read the HTML template file and export it as a string
        let otpTemplate = fs.readFileSync(templatePath, 'utf8');

        // Replace all occurrences of {{otp}} and {{reason}} in the HTML template
        otpTemplate = otpTemplate.replace('{{otp}}', otp);
        otpTemplate = otpTemplate.replaceAll('{{reason}}', reason);

        // Define the email content
        const mailOptions = {
            from: process.env.GMAIL_USERNAME,
            to: email, // Recipient's email address
            subject: "OTP for " + reason, // Email subject
            html: otpTemplate,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({ message: "Couldn't send OTP to the email" });
            } else {
                res.status(200).json({ otp, message: "OTP sent to the email" });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { sendOTP };

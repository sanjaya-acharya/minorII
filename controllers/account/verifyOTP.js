const Otp = require('../../models/Otp')

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

        // Here, if function is not returned by any of above cases, it means otp is valid
        // Mark the OTP as used
        otpRecord.used = true;
        await otpRecord.save();

        return res.status(200).json({ message: 'OTP verified successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { verifyOTP }
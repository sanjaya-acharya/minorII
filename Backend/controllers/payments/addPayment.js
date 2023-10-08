const Rating = require('../../models/Ratings');
const Users = require('../../models/Users');
const Items = require('../../models/Items');

const giveRating = async (req, res) => {
    const { userID, itemID, stars, message } = req.body;

    try {
        const user = await Users.findById(userID);
        const item = await Items.findById(itemID);

        if (!user || !item) {
            return res.status(404).json({ error: "User or item not found" });
        }

        if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
            return res.status(400).json({ error: "Stars should be integers between 1 and 5" });
        }

        const existingRating = await Rating.findOne({ userID, itemID });

        if (existingRating) {
            existingRating.stars = stars;
            existingRating.message = message;
            await existingRating.save();
        } else {
            const newRating = new Rating({
                userID,
                itemID,
                stars,
                message,
            });

            await newRating.save();
        }
        res.status(200).json({ message: 'Rating saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { giveRating };

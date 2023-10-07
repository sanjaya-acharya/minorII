const Rating = require('../../models/Ratings');

const removeRating = async (req, res) => {
    const { userID, itemID } = req.body;

    try {
        const rating = await Rating.findOneAndDelete({ userID, itemID });

        if (!rating) {
            return res.status(200).json({ error: "Rating not found" });
        }
        res.json({ message: 'Rating removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { removeRating };

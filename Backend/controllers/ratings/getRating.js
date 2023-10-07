const Rating = require('../../models/Ratings');
const Users = require('../../models/Users');
const Items = require('../../models/Items');

const getRating = async (req, res) => {
    const { itemID } = req.body;

    try {
        const item = await Items.findById(itemID);

        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        const ratings = await Rating.find({ itemID });

        if (!ratings || ratings.length === 0) {
            return res.status(200).json({ message: 'No ratings found for the item' });
        }

        const totalStars = ratings.reduce((sum, rating) => sum + rating.stars, 0);
        const averageStars = totalStars / ratings.length;

        res.json({ averageStars, totalRatings: ratings.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getRating };

const Favorites = require('../../models/Favorites');

const addToFav = async (req, res) => {
    try {
        const { userID, itemID } = req.body;

        const newFavoriteItem = new Favorites({
            userID: userID,
            itemID: itemID
        });

        await newFavoriteItem.save();

        res.json({
            message: 'Item added to Favorite items!',
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { addToFav };

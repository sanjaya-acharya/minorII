const Favorites = require('../../models/Favorites');

const removeFavItem = async (req, res) => {
    try {
        const { userID, itemID } = req.body;

        const favoriteItem = await Favorites.findOneAndDelete({ userID, itemID });

        if (!favoriteItem) {
            return res.status(200).json({ error: 'Favorite item not found' });
        }

        res.json({ message: 'item removed from Favorites' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { removeFavItem };

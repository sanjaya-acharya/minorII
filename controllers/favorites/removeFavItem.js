const Favorites = require('../../models/Favorites');

const removeFavItem = async (req, res) => {
    try {
        const { favoriteID } = req.body;

        const favoriteItem = await Favorites.findByIdAndRemove(favoriteID);

        if (!favoriteItem) {
            return res.status(200).json({ error: 'Favorite item not found' });
        }

        res.json({ message: 'Favorite item deleted!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { removeFavItem };

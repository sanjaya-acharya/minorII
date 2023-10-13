const Favorites = require('../../models/Favorites');

const addToFav = async (req, res) => {
    const { userID, itemID } = req.body;
    try {
        const FavoriteItem = await Favorites.findOne({userID, itemID})

        if (FavoriteItem) {
            return res.json({message: "Item is already in Favorites"})
        }

        const newFavoriteItem = new Favorites({
            userID: userID,
            itemID: itemID
        });

        await newFavoriteItem.save();

        res.json({
            message: 'Item added to Favorites',
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { addToFav };

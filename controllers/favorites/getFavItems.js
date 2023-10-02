const Favorites = require('../../models/Favorites');
const Items = require('../../models/Items');

const getFavItems = async (req, res) => {
    try {
        const { userID } = req.body;

        const favoriteItems = await Favorites.find({ userID: userID });

        if (!favoriteItems || favoriteItems.length === 0) {
            return res.status(200).json({ message: 'No favorite items found' });
        }

        const transformedFavoriteItems = await Promise.all(
            favoriteItems.map(async (favoriteItem) => {
                const item = await Items.findById(favoriteItem.itemID);

                return {
                    favoriteID: favoriteItem._id,
                    itemID: item._id,
                    itemName: item.itemName,
                    itemImage: item.itemImage,
                    itemPrice: item.price,
                    description: item.description,
                    availability: item.availability
                };
            })
        );

        res.json(transformedFavoriteItems);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getFavItems };

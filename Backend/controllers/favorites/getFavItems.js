const Favorites = require('../../models/Favorites');
const Items = require('../../models/Items');

const isFavorite = async (req, res) => {
  try {
    const { userID, itemID } = req.body;

    const favoriteItem = await Favorites.findOne({ userID, itemID });

    if (favoriteItem) {
        res.json({ isFavorite: true });
    } else {
        res.json({ isFavorite: false });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

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
                    _id: favoriteItem._id,
                    userID: favoriteItem.userID,
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

module.exports = { isFavorite, getFavItems };

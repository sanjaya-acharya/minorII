const Items = require('../../models/Items');
const Cart = require('../../models/Cart');
const Favorites = require('../../models/Favorites');
const Ratings = require('../../models/Ratings');
const fs = require('fs').promises;
const path = require('path');

const removeItem = async (req, res) => {
    const { itemId } = req.body;

    try {
        // Find the item by its itemId
        const item = await Items.findById(itemId);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        // Remove the item from users' carts
        await Cart.deleteMany({ itemId: itemId });

        // Remove the item from users' favorites
        await Favorites.deleteMany({ itemId: itemId });

        // Remove ratings associated with the item
        await Ratings.deleteMany({ itemId: itemId });

        try {
            // Delete the item's image from storage
            const imagePath = path.join('./src/uploads/', item.itemImage);
            await fs.unlink(imagePath);
        } catch (error) {
            console.log(error)
        }

        // Finally, remove the item itself
        await item.remove();

        res.status(200).json({ message: 'Item removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { removeItem };

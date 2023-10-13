const Items = require('../../models/Items')

const updateRatings = async (req, res) => {
    const {itemId, newRating} = req.body;
    try {
        const item = await Items.findById(itemId);

        if (!item) {
            // console.log('Item not found');
            return;
        }

        item.rating = newRating;

        await item.save();

    } catch (error) {
        // console.log(error);
    }
};

module.exports = { updateRatings }
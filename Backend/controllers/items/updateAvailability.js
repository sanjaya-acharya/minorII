const Items = require('../../models/Items')

const updateAvailability = async (req, res) => {
    const {itemId, availability} = req.body;
    try {
        const item = await Items.findById(itemId);

        if (!item) {
            return;
        }

        item.available = availability;

        await item.save();

    } catch (error) {
        // console.log(error);
    }
};

module.exports = { updateAvailability }
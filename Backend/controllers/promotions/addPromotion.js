const Promotions = require('../../models/Promotions');
const Items = require('../../models/Items');

const addPromotion = async (req, res) => {
    const { itemID, newPrice, endDate } = req.body;

    try {
        const item = await Items.findById(itemID);

        if (!item) {
            return res.status(500).json({ error: 'Item not found' });
        }

        const newPromotion = new Promotions({
            itemID: itemID,
            newPrice: newPrice,
            endDate: endDate
        });

        await newPromotion.save();

        res.status(200).json({
            message: 'Item added for promotion!',
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { addPromotion };

const Promotions = require('../../models/Promotions');
const Items = require('../../models/Items');

const updatePromotion = async (req, res) => {
    const { itemID, newPromotionPrice, extendedEndDate } = req.body;

    try {
        const item = await Items.findById(itemID);

        if (!item) {
            return res.status(200).json({ error: 'Item not found' });
        }

        let promotion = await Promotions.findOne({ itemID });

        if (!promotion) {
            return res.status(200).json({ error: 'Promotion not found' });
        }

        if (newPromotionPrice) {
            promotion.newPrice = newPromotionPrice;
        }

        if (extendedEndDate) {
            promotion.endDate = extendedEndDate;
        }

        await promotion.save();

        res.status(200).json({
            message: 'Promotion updated successfully',
            promotion,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { updatePromotion };

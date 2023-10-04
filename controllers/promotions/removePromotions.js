const Promotions = require('../../models/Promotions');

const removePromotion = async (req, res) => {
    const { promotionID } = req.body;

    try {
        const promotionItem = await Promotions.findByIdAndRemove(promotionID);

        if (!promotionItem) {
            return res.status(200).json({ error: 'Promotion not found' });
        }

        res.json({ message: 'Promotion deleted!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { removePromotion };

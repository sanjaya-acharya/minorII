const Promotions = require('../../models/Promotions');
const Items = require('../../models/Items');

const getPromotions = async (req, res) => {
    try {
        const promotionItems = await Promotions.find();

        if (!promotionItems || promotionItems.length === 0) {
            return res.status(200).json({ message: 'No items for promotion' });
        }

        const transformedPromotionItems = await Promise.all(
            promotionItems.map(async (promotionItem) => {
                const item = await Items.findById(promotionItem.itemID);

                return {
                    promotionID: promotionItem._id,
                    itemID: item._id,
                    itemName: item.itemName,
                    itemImage: item.itemImage,
                    oldPrice: item.price,
                    newPrice: promotionItem.newPrice,
                    description: item.description,
                    availability: item.availability
                };
            })
        );

        res.json(transformedPromotionItems);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getPromotions };

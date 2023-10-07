const Items = require('../../models/Items');

const addItem = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Please upload a valid file' });
        }

        const { itemName, price, description } = req.body;

        const newItem = new Items({
            itemName: itemName,
            price: price,
            itemImage: req.file.filename,
            description: description,
            available: true,
        });

        await newItem.save();

        res.status(200).json({
            message: 'Product added!',
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { addItem };

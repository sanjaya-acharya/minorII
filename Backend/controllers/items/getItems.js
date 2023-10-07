const Items = require('../../models/Items');
const mongoose = require('mongoose')

const getItem = async (req, res) => {
    const { itemID } = req.body;

    try {
        const item = await Items.findById(itemID);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllItems = async (req, res) => {
    try {
        const items = await Items.find();

        if (!items || items.length === 0) {
            return res.status(200).json({ message: 'No items registered' });
        }

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getItem, getAllItems };

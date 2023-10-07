const Items = require('../../models/Items');
const fs = require('fs').promises;
const path = require('path');

const updateItem = async (req, res) => {
    try {
        const { itemId, newPrice, newName } = req.body;

        const item = await Items.findById(itemId);

        if (!item) {
            if (req.file) {
                const imagePath = path.join('./src/uploads/', req.file.filename);
                try {
                    fs.unlink(imagePath); // Remove the uploaded image
                } catch (error) {
                    console.log(error)
                }
            }
            return res.status(404).json({ error: 'Item not found' });
        }

        if (newPrice) {
            item.price = newPrice;
        }
        if (newName) {
            item.itemName = newName;
        }

        if (req.file) {
            const oldImage = path.join('./src/uploads/', item.itemImage);
            try {
                fs.unlink(oldImage); // Remove the old image
            } catch (error) {
                console.log(error)
            }

            // Save the new image filename to the item
            const newImage = req.file.filename;
            item.itemImage = newImage;
        }

        await item.save();

        res.status(200).json({ message: 'Item updated successfully', item });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { updateItem };

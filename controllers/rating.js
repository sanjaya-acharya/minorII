const Items = require('../models/Items');

const addItem = (req, res) => {
    const { itemName, price } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: 'Please upload a file' });
    }

    const newItem = new Items({
        itemName: itemName,
        price: price,
        imageURL: req.file.filename,
        ratingsCount: 0,
        ratingsSum: 0
    });

    newItem.save()
        .then(() => {
            res.json({
                message: 'Product added!',
                url: req.file.filename
            });
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

const getItems = (req, res) => {
    Items.find()
        .then( products => res.json(products) )
        .catch( error => res.status(500).json({ error: 'Internal Server Error' }) );
};

const updateItem = (req, res) => {
    const itemId = req.body.itemId;

    // Find the existing item in the database
    Items.findById(itemId)
        .then(item => {
            if (!item) {
                return res.status(200).json({ error: 'Item not found' });
            }

            // Update only the fields that are provided in the request body
            if (req.body.itemName) {
                item.itemName = req.body.itemName;
            }

            if (req.body.price) {
                item.price = req.body.price;
            }

            if (req.file) {
                // If a new file is uploaded, update the imageURL
                item.imageURL = req.file.filename;
            }

            // Save the updated item
            item.save()
                .then(updatedItem => {
                    res.json({
                        message: 'Item updated!',
                        item: updatedItem
                    });
                })
                .catch(error => {
                    res.status(500).json({ error: 'Internal Server Error' });
                });
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

const deleteItem = (req, res) => {
    const itemId = req.params.id; // Assuming the item ID is passed as a URL parameter

    Items.findByIdAndRemove(itemId)
        .then(deletedItem => {
            if (!deletedItem) {
                return res.status(200).json({ error: 'Item not found' });
            }

            res.json({
                message: 'Item deleted!',
                item: deletedItem
            });
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

module.exports = { addItem, getItems, updateItem, deleteItem };
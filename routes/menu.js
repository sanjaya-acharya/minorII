const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path');

const menu = require('../controllers/menu')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination folder for uploaded files
        cb(null, './src/uploads/');
    },
    filename: (req, file, cb) => {
        // Use the original file name as the uploaded file's name
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, "IMG-" + uniqueSuffix + extension);
    }
});

const upload = multer({ storage: storage });

router.post('/getitems', menu.getItems)
router.post('/addcoffee', upload.single('imageURL'), menu.addItem);

module.exports = router
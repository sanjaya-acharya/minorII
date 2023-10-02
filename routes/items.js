const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path');

// Define storage and file filter for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the destination directory for file uploads
        cb(null, './src/uploads/');
    },
    filename: (req, file, cb) => {
        // Define the filename for the uploaded file
        const uniqueSuffix = Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, "IMG-" + uniqueSuffix + extension);
    }
});

const fileFilter = (req, file, cb) => {
    // Define allowed file types
    const allowedFileTypes = /jpeg|jpg|png/;
    // Check file extension
    const extname = allowedFileTypes.test(file.originalname.toLowerCase());
    // Check MIME type
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type! Only JPEG, JPG, or PNG files are allowed.'), false);
    }
};

// Set up multer with the defined storage and file filter
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 25 * 1024 * 1024, // 25 MB file size limit
    },
    fileFilter: fileFilter,
});

const { addItem } = require('../controllers/items/addItem')
const { getItem, getAllItems } = require('../controllers/items/getItems')
const { updateAvailability } = require('../controllers/items/updateAvailability')
const { updateRatings } = require('../controllers/items/updateRatings')
const { updateItem } = require('../controllers/items/updateItem')

router.post('/additem', upload.single('itemImage'), addItem)
router.post('/getitems', getItem)
router.post('/getallitems', getAllItems)
router.post('/updateAvailability', updateAvailability)
router.post('/updateRatings', updateRatings)
router.post('/updateItem', upload.single('newItemImage'), updateItem)

module.exports = router
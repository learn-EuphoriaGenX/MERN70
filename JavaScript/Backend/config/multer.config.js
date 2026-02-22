const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure folder exists
const ensureFolderExists = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
};

// Storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folderName = '';

        if (req.route.path.split('/').includes('posts')) {
            folderName = path.join(__dirname, '../uploads/posts');
        }
        else if (req.route.path.split('/').includes('users')) {
            folderName = path.join(__dirname, '../uploads/profile');
        }
        else {
            cb(new Error('Invalid upload path'), null);
            return;
        }

        ensureFolderExists(folderName);
        cb(null, folderName);
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Only JPEG, PNG, GIF allowed!'), false); // Reject file
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

module.exports = upload;
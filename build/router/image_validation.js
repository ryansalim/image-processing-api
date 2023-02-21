"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const validateImage = (req, res, next) => {
    const fileName = req.query.name;
    const imagePath = path_1.default.resolve(__dirname, '..', '..', 'images', fileName);
    // Check if the file exists
    if (!fs_1.default.existsSync(imagePath)) {
        return res.status(404).send('Image not found');
    }
    // Check if the file is a valid image
    (0, sharp_1.default)(imagePath)
        .metadata()
        .then((metadata) => {
        if (!metadata.format) {
            return res.status(400).send('Invalid image format!');
        }
        console.log('Valid image! Processing...');
        next();
    })
        .catch((err) => {
        console.error(err);
        return res.status(400).send('Invalid image');
    });
};
exports.default = validateImage;

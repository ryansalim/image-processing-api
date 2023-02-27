"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const helper_1 = __importDefault(require("../utils/helper"));
const validateImage = (req, res, next) => {
    const imageData = new helper_1.default(req.query.name);
    // Check if the file exists
    fs_1.default.access(imageData.imagePath, fs_1.default.constants.F_OK, (err) => {
        if (err)
            return res.status(404).send('Image not found');
    });
    // Check if the file is a valid image
    (0, sharp_1.default)(imageData.imagePath)
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

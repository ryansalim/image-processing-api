"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageData = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class ImageData {
    constructor(name) {
        this.processedImagePathHelper = (params) => {
            const imageName = params.join('x');
            return path_1.default.resolve(this.processedImageFolderPath, `${this.name}_${imageName}${this.ext}`);
        };
        this.createOutputDirIfNeeded = () => {
            if (!fs_1.default.existsSync(this.processedImageFolderPath)) {
                console.log('Creating folder');
                fs_1.default.mkdirSync(this.processedImageFolderPath);
            }
        };
        this.fileName = name;
        this.imagePath = ImageData.imagePathHelper(name);
        this.processedImageFolderPath = ImageData.processedImageFolderPathHelper();
        this.name = path_1.default.parse(this.imagePath).name;
        this.ext = path_1.default.parse(this.imagePath).ext;
    }
}
exports.ImageData = ImageData;
ImageData.imagePathHelper = (fileName) => {
    return path_1.default.resolve(__dirname, '..', '..', 'images', fileName);
};
ImageData.processedImageFolderPathHelper = () => {
    return path_1.default.resolve(__dirname, '..', '..', 'processed_images');
};

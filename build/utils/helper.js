"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _ImageData_createOutputDirIfNeeded;
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class ImageData {
    constructor(name) {
        this.processedFileName = '';
        this.processedImagePath = (...params) => {
            const imageName = params.join('x');
            __classPrivateFieldGet(this, _ImageData_createOutputDirIfNeeded, "f").call(this);
            const result = path_1.default.resolve(this.processedImageFolderPath, `${this.name}_${imageName}${this.ext}`);
            this.processedFileName = path_1.default.parse(result).name;
            return result;
        };
        _ImageData_createOutputDirIfNeeded.set(this, () => {
            if (!fs_1.default.existsSync(this.processedImageFolderPath)) {
                console.log('Creating new folder');
                fs_1.default.mkdirSync(this.processedImageFolderPath);
            }
        });
        this.imagePath = path_1.default.resolve(__dirname, '..', '..', 'images', name);
        this.processedImageFolderPath = path_1.default.resolve(__dirname, '..', '..', 'processed_images');
        this.name = path_1.default.parse(this.imagePath).name;
        this.ext = path_1.default.parse(this.imagePath).ext;
    }
}
_ImageData_createOutputDirIfNeeded = new WeakMap();
exports.default = ImageData;

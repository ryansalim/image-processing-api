"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const image_validation_1 = __importDefault(require("../image_validation"));
const fs_1 = __importDefault(require("fs"));
const helper_1 = __importDefault(require("../../utils/helper"));
const router = express_1.default.Router();
router.get('/process', image_validation_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    if (query.width == undefined || query.height == undefined) {
        return res.status(400).send('Specify the width and height to resize!');
    }
    const width = parseInt(query.width, 10);
    const height = parseInt(query.height, 10);
    const fileName = req.query.name;
    const imageData = new helper_1.default(fileName, `${width}`, `${height}`);
    const imagePath = imageData.imagePath;
    const processedImagePath = imageData.processedImagePath;
    // Return existing image if there is one already, else create new image
    fs_1.default.readFile(processedImagePath, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (err != null) {
            console.log('Creating new image...');
            yield (0, sharp_1.default)(imagePath)
                .resize(width, height)
                .toBuffer()
                .then((buffer) => {
                saveImage(processedImagePath, buffer);
            })
                .catch((err) => {
                console.error(err);
                return res.status(500).send('Failed saving image');
            });
        }
        else {
            console.log(`${imageData.processedFileName} already exist`);
            res.set('Content-Type', 'image/jpeg');
            res.send(data);
        }
    }));
    const saveImage = (path, buffer) => {
        fs_1.default.writeFile(path, buffer, (err) => {
            if (err != null) {
                console.log(err);
                res.status(500).send('Error saving resized image');
            }
            else {
                console.log('New image created');
                res.set('Content-Type', 'image/jpeg');
                res.send(buffer);
            }
        });
    };
}));
exports.default = router;

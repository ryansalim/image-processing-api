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
    const width = parseInt(req.query.width, 10);
    const height = parseInt(req.query.height, 10);
    const imageData = new helper_1.default(req.query.name);
    const imagePath = imageData.imagePath;
    const processedImagePath = imageData.processedImagePath(`${width}`, `${height}`);
    // Return existing image if there is one already, else create new image
    if (fs_1.default.existsSync(processedImagePath)) {
        fs_1.default.readFile(processedImagePath, (err, data) => {
            if (err != null) {
                console.log(err);
                res.status(500).send('Error loading resized image');
            }
            else {
                console.log(`${imageData.processedFileName} already exist`);
                res.set('Content-Type', 'image/jpeg');
                res.send(data);
            }
        });
    }
    else {
        console.log('Creating new image...');
        const processedImageBuffer = yield (0, sharp_1.default)(imagePath)
            .resize(width, height)
            .toBuffer();
        fs_1.default.writeFile(processedImagePath, processedImageBuffer, (err) => {
            if (err != null) {
                console.log(err);
                res.status(500).send('Error saving resized image');
            }
            else {
                console.log('New image created');
                res.set('Content-Type', 'image/jpeg');
                res.send(processedImageBuffer);
            }
        });
    }
}));
exports.default = router;

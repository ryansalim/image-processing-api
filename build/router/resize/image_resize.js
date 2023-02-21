"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const helper = __importStar(require("../helper"));
const router = express_1.default.Router();
router.get('/process', image_validation_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.query.name;
    const width = parseInt(req.query.width, 10);
    const height = parseInt(req.query.height, 10);
    const imageData = new helper.ImageData(fileName);
    const imagePath = imageData.imagePath;
    const processedImagePath = imageData.processedImagePathHelper([`${width}`, `${height}`]);
    // Check if folder doesn't exist, create one
    imageData.createOutputDirIfNeeded();
    // Return existing image if there is one already, else create new image
    if (fs_1.default.existsSync(processedImagePath)) {
        console.log(`${processedImagePath} already exist`);
        fs_1.default.readFile(processedImagePath, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error loading resized image');
            }
            else {
                res.set('Content-Type', 'image/jpeg');
                res.send(data);
            }
        });
    }
    else {
        console.log('Creating new image');
        const processedImageBuffer = yield (0, sharp_1.default)(imagePath)
            .resize(width, height)
            .toBuffer();
        fs_1.default.writeFile(processedImagePath, processedImageBuffer, (err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error saving resized image');
            }
            else {
                res.set('Content-Type', 'image/jpeg');
                res.send(processedImageBuffer);
            }
        });
    }
}));
exports.default = router;

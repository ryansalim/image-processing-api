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
const fs_1 = __importDefault(require("fs"));
const image_validation_1 = __importDefault(require("../image_validation"));
const helper_1 = __importDefault(require("../../utils/helper"));
const router = express_1.default.Router();
router.delete('/process', image_validation_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    if (query.removeAll != undefined) {
        return fs_1.default.rm(helper_1.default.imageFolderPath(), { recursive: true }, (err) => {
            if (err != null)
                return res.status(404).send('Folder not found');
            res.send('All images deleted!');
        });
    }
    if (query.width == undefined || query.height == undefined)
        return res.status(400).send('Specify the width and height!');
    const width = parseInt(query.width, 10);
    const height = parseInt(query.height, 10);
    const fileName = query.name;
    const imageData = new helper_1.default(fileName, `${width}`, `${height}`);
    const processedImagePath = imageData.processedImagePath;
    fs_1.default.unlink(processedImagePath, (err) => {
        if (err != null)
            return res.status(404).send('No Image found!');
        console.log(`${imageData.processedFileName} is deleted!`);
        res.send('Success deleting image!');
    });
}));
exports.default = router;

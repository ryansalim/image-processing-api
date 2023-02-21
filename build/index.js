"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resize_1 = __importDefault(require("./router/processor/resize"));
const delete_1 = __importDefault(require("./router/processor/delete"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/image', resize_1.default, delete_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to the image processing API!');
});
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});

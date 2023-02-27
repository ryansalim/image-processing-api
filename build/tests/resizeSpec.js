"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const fs_1 = __importDefault(require("fs"));
const index_1 = __importDefault(require("../index"));
const sharp_1 = __importDefault(require("sharp"));
const express_1 = __importDefault(require("express"));
describe('GET Image resizer', () => {
    it('Should create new image when failed reading image', (done) => {
        const testData = Buffer.from('test image');
        spyOn(fs_1.default.promises, 'readFile').and.returnValue(Promise.reject(Error()).catch((err) => {
            return err;
        }));
        spyOn(sharp_1.default.prototype, 'toBuffer').and.returnValue(Promise.resolve(testData));
        spyOn(fs_1.default.promises, 'writeFile').and.returnValue(Promise.resolve());
        spyOn(express_1.default.response, 'set').and.callFake(jasmine.createSpy());
        (0, supertest_1.default)(index_1.default)
            .get('/image/process?name=test-image.jpg&width=100&height=100')
            .expect(200, testData)
            .end((err) => {
            if (err) {
                done();
                return;
            }
            done();
        });
    });
    it('Should send data when success reading image', (done) => {
        const testData = Buffer.from('test image data');
        spyOn(fs_1.default.promises, 'readFile').and.returnValue(Promise.resolve(testData));
        spyOn(express_1.default.response, 'set').and.callFake(jasmine.createSpy());
        (0, supertest_1.default)(index_1.default)
            .get('/image/process?name=test-image.jpg&width=100&height=100')
            .expect(200, testData)
            .end((err) => {
            if (err) {
                done();
                return;
            }
            done();
        });
    });
});

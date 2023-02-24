"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const fs_1 = __importDefault(require("fs"));
const index_1 = __importDefault(require("../index"));
describe('GET Image resizer', () => {
    it('Should throw error when failed reading image', (done) => {
        spyOn(fs_1.default, 'existsSync').and.returnValue(true);
        spyOn(fs_1.default.promises, 'readFile').and.returnValue(Promise.reject(Error('Error loading resized image')).catch((err) => {
            return err;
        }));
        (0, supertest_1.default)(index_1.default)
            .get('/image/process?name=test-image.jpg&width=100&height=100')
            .expect(500, 'Error loading resized image')
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
        spyOn(fs_1.default, 'existsSync').and.returnValue(true);
        spyOn(fs_1.default.promises, 'readFile').and.returnValue(Promise.resolve(testData));
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

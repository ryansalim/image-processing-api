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
const supertest_1 = __importDefault(require("supertest"));
const fs_1 = __importDefault(require("fs"));
const index_1 = __importDefault(require("../index"));
describe('DELETE /process', () => {
    it('should return 404 if the image does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const spy = spyOn(fs_1.default, 'existsSync');
        spy.and.returnValue(false);
        const response = yield (0, supertest_1.default)(index_1.default).delete('/image/process?name=nonexistent-image.jpg&width=100&height=100');
        expect(response.status).toBe(404);
        expect(spy).toHaveBeenCalled();
    }));
    it('should return 500 if error deleting image', (done) => {
        const testData = Buffer.from('Test image data');
        const imagePath = './test-image.jpg';
        const testError = Error('Error');
        fs_1.default.writeFileSync(imagePath, testData);
        spyOn(fs_1.default, 'existsSync').and.returnValue(true);
        spyOn(fs_1.default, 'unlink').and.throwError(testError);
        (0, supertest_1.default)(index_1.default)
            .delete('/image/process?name=test-image.jpg&width=100&height=100')
            .expect(500, 'Error deleting image')
            .end((err) => {
            if (err)
                return done();
            done();
        });
    });
    it('should remove image if the image already exist', (done) => {
        const testData = Buffer.from('Test image data');
        const imagePath = './test-image.jpg';
        fs_1.default.writeFileSync(imagePath, testData);
        spyOn(fs_1.default, 'existsSync').and.returnValue(true);
        (0, supertest_1.default)(index_1.default)
            .delete('/image/process?name=test-image.jpg&width=100&height=100')
            .expect(200, 'Success deleting image!')
            .end((err) => {
            if (err)
                return done();
            // Check if the image has been deleted
            expect(fs_1.default.existsSync(imagePath)).toBeFalsy();
            done();
        });
    });
    afterEach(() => {
        // Delete the test image if it exists
        if (fs_1.default.existsSync('./test-image.jpg')) {
            console.log('deleting image');
            fs_1.default.unlinkSync('./test-image.jpg');
        }
    });
});

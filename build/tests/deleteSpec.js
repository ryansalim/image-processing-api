"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const fs_1 = __importDefault(require("fs"));
const index_1 = __importDefault(require("../index"));
const express_1 = __importDefault(require("express"));
describe('DELETE /process', () => {
    it('should return 404 if the image does not exist', (done) => {
        spyOn(fs_1.default.promises, 'unlink').and.returnValue(Promise.resolve());
        spyOn(express_1.default.response, 'set').and.callFake(jasmine.createSpy());
        (0, supertest_1.default)(index_1.default)
            .delete('/image/process?name=nonexistent-image.jpg&width=100&height=100')
            .expect(404, 'No Image found!')
            .end(err => {
            if (err)
                return done();
            done();
        });
    });
    it('should remove image if the image already exist', (done) => {
        spyOn(fs_1.default.promises, 'unlink').and.returnValue(Promise.resolve());
        spyOn(express_1.default.response, 'set').and.callFake(jasmine.createSpy());
        (0, supertest_1.default)(index_1.default)
            .delete('/image/process?name=test-image.jpg&width=100&height=100')
            .expect(200, 'Success deleting image!')
            .end((err) => {
            if (err)
                return done();
            done();
        });
    });
});

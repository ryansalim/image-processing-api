import request from 'supertest'
import fs from 'fs'
import app from '../index'
import express from 'express'

describe('DELETE /process', () => {
  it('should return 404 if the image does not exist', (done) => {
    spyOn(fs.promises, 'unlink').and.returnValue(Promise.resolve())
    spyOn(express.response, 'set').and.callFake(jasmine.createSpy())

    request(app)
      .delete('/image/process?name=nonexistent-image.jpg&width=100&height=100')
      .expect(404, 'No Image found!')
      .end((err) => {
        if (err) return done()
        done()
      })
  })

  it('should remove image if the image already exist', (done) => {
    spyOn(fs.promises, 'unlink').and.returnValue(Promise.resolve())
    spyOn(express.response, 'set').and.callFake(jasmine.createSpy())

    request(app)
      .delete('/image/process?name=test-image.jpg&width=100&height=100')
      .expect(200, 'Success deleting image!')
      .end((err) => {
        if (err) return done()
        done()
      })
  })
})

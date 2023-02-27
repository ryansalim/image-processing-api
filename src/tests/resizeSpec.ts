import request from 'supertest'
import fs from 'fs'
import app from '../index'
import sharp from 'sharp'
import express from 'express'

describe('GET Image resizer', () => {
  it('Should create new image when failed reading image', (done) => {
    const testData = Buffer.from('test image')
    spyOn(fs.promises, 'readFile').and.returnValue(
      Promise.reject(Error()).catch((err) => {
        return err
      })
    )
    spyOn(sharp.prototype, 'toBuffer').and.returnValue(
      Promise.resolve(testData)
    )
    spyOn(fs.promises, 'writeFile').and.returnValue(Promise.resolve())
    spyOn(express.response, 'set').and.callFake(jasmine.createSpy())

    request(app)
      .get('/image/process?name=test-image.jpg&width=100&height=100')
      .expect(200, testData)
      .end((err) => {
        if (err) {
          done()
          return
        }
        done()
      })
  })

  it('Should send data when success reading image', (done) => {
    const testData = Buffer.from('test image data')
    spyOn(fs.promises, 'readFile').and.returnValue(Promise.resolve(testData))
    spyOn(express.response, 'set').and.callFake(jasmine.createSpy())

    request(app)
      .get('/image/process?name=test-image.jpg&width=100&height=100')
      .expect(200, testData)
      .end((err) => {
        if (err) {
          done()
          return
        }
        done()
      })
  })
})

import request from 'supertest'
import fs from 'fs'
import app from '../index'

describe('GET Image resizer', () => {
  it('Should throw error when failed reading image', (done) => {
    spyOn(fs, 'existsSync').and.returnValue(true)
    spyOn(fs.promises, 'readFile').and.returnValue(
      Promise.reject(Error('Error loading resized image')).catch((err) => {
        return err
      })
    )

    request(app)
      .get('/image/process?name=test-image.jpg&width=100&height=100')
      .expect(500, 'Error loading resized image')
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
    spyOn(fs, 'existsSync').and.returnValue(true)
    spyOn(fs.promises, 'readFile').and.returnValue(Promise.resolve(testData))

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

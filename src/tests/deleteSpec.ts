import request from 'supertest'
import fs from 'fs'
import app from '../index'

describe('DELETE /process', () => {
  it('should return 404 if the image does not exist', async () => {
    const spy = spyOn(fs, 'existsSync')
    spy.and.returnValue(false)

    const response = await request(app).delete(
      '/image/process?name=nonexistent-image.jpg&width=100&height=100'
    )
    expect(response.status).toBe(404)
    expect(spy).toHaveBeenCalled()
  })

  it('should return 500 if error deleting image', (done) => {
    const testData = Buffer.from('Test image data')
    const imagePath = './test-image.jpg'
    const testError = Error('Error')

    fs.writeFileSync(imagePath, testData)
    spyOn(fs, 'existsSync').and.returnValue(true)
    spyOn(fs, 'unlink').and.throwError(testError)

    request(app)
      .delete('/image/process?name=test-image.jpg&width=100&height=100')
      .expect(500, 'Error deleting image')
      .end((err) => {
        if (err) {
          done()
          return
        }
        done()
      })
  })

  it('should remove image if the image already exist', (done) => {
    const testData = Buffer.from('Test image data')
    const imagePath = './test-image.jpg'

    fs.writeFileSync(imagePath, testData)
    spyOn(fs, 'existsSync').and.returnValue(true)

    request(app)
      .delete('/image/process?name=test-image.jpg&width=100&height=100')
      .expect(200, 'Success deleting image!')
      .end((err) => {
        if (err) {
          done()
          return
        }
        // Check if the image has been deleted
        expect(fs.existsSync(imagePath)).toBeFalsy()
        done()
      })
  })

  afterEach(() => {
    // Delete the test image if it exists
    if (fs.existsSync('./test-image.jpg')) {
      console.log('deleting image')
      fs.unlinkSync('./test-image.jpg')
    }
  })
})

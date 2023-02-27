import express from 'express'
import sharp from 'sharp'
import validator from '../image_validation'
import fs from 'fs'
import ImageData from '../../utils/helper'

const router = express.Router()

router.get('/process', validator, async (req, res) => {
  const query = req.query

  if (query.width == undefined || query.height == undefined) {
    return res.status(400).send('Specify the width and height to resize!')
  }

  const width = parseInt(query.width as string, 10)
  const height = parseInt(query.height as string, 10)
  const fileName = req.query.name as string

  const imageData = new ImageData(fileName, `${width}`, `${height}`)
  const imagePath = imageData.imagePath
  const processedImagePath = imageData.processedImagePath as string

  // Return existing image if there is one already, else create new image

  fs.readFile(processedImagePath, async (err, data) => {
    if (err != null) {
      console.log('Creating new image...')
      await sharp(imagePath)
        .resize(width, height)
        .toBuffer()
        .then((buffer) => {
          saveImage(processedImagePath, buffer)
        })
        .catch((err) => {
          console.error(err)
          return res.status(500).send('Failed saving image')
        })
    } else {
      console.log(`${imageData.processedFileName} already exist`)
      res.set('Content-Type', 'image/jpeg')
      res.send(data)
    }
  })

  const saveImage = (path: string, buffer: Buffer) => {
    fs.writeFile(path, buffer, (err) => {
      if (err != null) {
        console.log(err)
        res.status(500).send('Error saving resized image')
      } else {
        console.log('New image created')
        res.set('Content-Type', 'image/jpeg')
        res.send(buffer)
      }
    })
  }
})

export default router

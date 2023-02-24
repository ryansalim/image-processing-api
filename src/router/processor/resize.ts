import express from 'express'
import sharp from 'sharp'
import validator from '../image_validation'
import fs from 'fs'
import ImageData from '../../utils/helper'

const router = express.Router()

router.get('/process', validator, async (req, res) => {
  const width = parseInt(req.query.width as string, 10)
  const height = parseInt(req.query.height as string, 10)

  const imageData = new ImageData(req.query.name as string)

  const imagePath = imageData.imagePath
  const processedImagePath = imageData.processedImagePath(
    `${width}`,
    `${height}`
  )

  // Return existing image if there is one already, else create new image
  if (fs.existsSync(processedImagePath)) {
    fs.readFile(processedImagePath, (err, data) => {
      if (err != null) {
        console.log(err)
        res.status(500).send('Error loading resized image')
      } else {
        console.log(`${imageData.processedFileName} already exist`)
        res.set('Content-Type', 'image/jpeg')
        res.send(data)
      }
    })
  } else {
    console.log('Creating new image...')
    const processedImageBuffer = await sharp(imagePath)
      .resize(width, height)
      .toBuffer()

    fs.writeFile(processedImagePath, processedImageBuffer, (err) => {
      if (err != null) {
        console.log(err)
        res.status(500).send('Error saving resized image')
      } else {
        console.log('New image created')
        res.set('Content-Type', 'image/jpeg')
        res.send(processedImageBuffer)
      }
    })
  }
})

export default router

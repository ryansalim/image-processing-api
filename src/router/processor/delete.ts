import express from 'express'
import fs from 'fs'
import validator from '../image_validation'
import ImageData from '../../utils/helper'

const router = express.Router()

router.delete('/process', validator, async (req, res) => {
  const width = parseInt(req.query.width as string, 10)
  const height = parseInt(req.query.height as string, 10)

  const imageData = new ImageData(req.query.name as string)

  const processedImagePath = imageData.processedImagePath(
    `${width}`,
    `${height}`
  )

  if (fs.existsSync(processedImagePath)) {
    fs.unlink(processedImagePath, (err) => {
      if (err != null) {
        console.log(err)
        res.status(500).send('Error deleting image')
      } else {
        console.log(`${imageData.processedFileName} is deleted!`)
        res.send('Success deleting image!')
      }
    })
  } else {
    res.status(404).send('No Image found!')
  }
})

export default router

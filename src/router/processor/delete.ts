import express from 'express'
import fs from 'fs'
import validator from '../image_validation'
import ImageData from '../../utils/helper'

const router = express.Router()

router.delete('/process', validator, async (req, res) => {
  const query = req.query

  if (query.removeAll != undefined) {
    return fs.rm(ImageData.imageFolderPath(), { recursive: true }, (err) => {
      if (err != null) return res.status(404).send('Folder not found')
      res.send('All images deleted!')
    })
  }

  if (query.width == undefined || query.height == undefined)
    return res.status(400).send('Specify the width and height!')

  const width = parseInt(query.width as string, 10)
  const height = parseInt(query.height as string, 10)
  const fileName = query.name as string

  const imageData = new ImageData(fileName, `${width}`, `${height}`)
  const processedImagePath = imageData.processedImagePath as string

  fs.unlink(processedImagePath, (err) => {
    if (err != null) return res.status(404).send('No Image found!')
    console.log(`${imageData.processedFileName} is deleted!`)
    res.send('Success deleting image!')
  })
})

export default router

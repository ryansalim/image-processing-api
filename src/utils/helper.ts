import path from 'path'
import fs from 'fs'

class ImageData {
  name: string
  ext: string
  imagePath: string
  processedImageFolderPath: string
  processedFileName = ''

  constructor(name: string) {
    this.imagePath = path.resolve(__dirname, '..', '..', 'images', name)
    this.processedImageFolderPath = path.resolve(
      __dirname,
      '..',
      '..',
      'processed_images'
    )
    this.name = path.parse(this.imagePath).name
    this.ext = path.parse(this.imagePath).ext
  }

  processedImagePath = (...params: string[]): string => {
    const imageName = params.join('x')
    this.#createOutputDirIfNeeded()
    const result = path.resolve(
      this.processedImageFolderPath,
      `${this.name}_${imageName}${this.ext}`
    )
    this.processedFileName = path.parse(result).name
    return result
  }

  #createOutputDirIfNeeded = () => {
    if (!fs.existsSync(this.processedImageFolderPath)) {
      console.log('Creating new folder')
      fs.mkdirSync(this.processedImageFolderPath)
    }
  }
}

export default ImageData

import path from 'path'
import fs from 'fs'

class ImageData {
  name: string
  ext: string
  imagePath: string
  processedImageFolderPath: string
  processedFileName?: string
  processedImagePath?: string

  constructor(name: string, ...params: string[]) {
    this.imagePath = path.resolve(__dirname, '..', '..', 'images', name)
    this.processedImageFolderPath = ImageData.imageFolderPath()
    this.name = path.parse(this.imagePath).name
    this.ext = path.parse(this.imagePath).ext

    if (params.length > 0) {
      this.processedImagePath = this.#processedImagePath(...params)
    }
  }

  static imageFolderPath = (): string => {
    return path.resolve(__dirname, '..', '..', 'processed_images')
  }

  #processedImagePath = (...params: string[]): string => {
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

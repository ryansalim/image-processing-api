import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
import ImageData from '../utils/helper';

const validateImage = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const imageData = new ImageData(req.query.name as string);

    // Check if the file exists
    if (!fs.existsSync(imageData.imagePath)) {
        return res.status(404).send('Image not found');
    }

    // Check if the file is a valid image
    sharp(imageData.imagePath)
        .metadata()
        .then((metadata) => {
            if (!metadata.format) {
                return res.status(400).send('Invalid image format!');
            }
            console.log('Valid image! Processing...');
            next();
        })
        .catch((err) => {
            console.error(err);
            return res.status(400).send('Invalid image');
        });
};

export default validateImage;

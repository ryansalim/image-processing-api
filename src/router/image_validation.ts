import express from 'express';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';

const validateImage = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const fileName = req.query.name as string;
    const imagePath = path.resolve(__dirname, '..', '..', 'images', fileName);

    // Check if the file exists
    if (!fs.existsSync(imagePath)) {
        return res.status(404).send('Image not found');
    }

    // Check if the file is a valid image
    sharp(imagePath)
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

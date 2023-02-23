import express from 'express';
import imageResizer from './router/processor/resize';
import imageRemover from './router/processor/delete';

const app = express();
const port = 3000;

app.use('/image', imageResizer, imageRemover);

app.get('/', (req, res) => {
    res.send('Welcome to the image processing API!');
});

app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});

export default app;
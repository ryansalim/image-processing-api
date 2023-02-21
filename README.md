# Image Processing API

## Features

- Resize image
- Delete existing image

## Tech

This project uses a number of open source projects to work properly:

- [Node.js]() - HTML enhanced for web apps!
- [Express]() - fast node.js network app framework [@tjholowaychuk]
- [Jasmine]() - Markdown parser done right. Fast and easy to extend.
- [Prettier]() - great UI boilerplate for modern web apps
- [Sharp]() - evented I/O for the backend
- [Nodemon]() - 

## Installation

This project requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies.

```sh
cd image-processing-api
npm i
```

## Commands
- Starting the server

```sh
npm run start
```

- Building project

```sh
npm run build
```

### Example
- Resize image

    GET http://localhost:3000/image/process?name={image_name.jpeg}&width=300&height=300

- Delete image

    DELETE http://localhost:3000/image/process?name={image_name.jpeg}&width=300&height=300

### Available Image Names
- encenadaport.jpg
- fjord.jpg
- icelandwaterfall.jpg
- palmtunnel.jpg
- santamonica.jpg
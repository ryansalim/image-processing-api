# Image Processing API

## Features

- Resize image
- Delete existing image

## Tech

This project uses a number of open source projects to work properly:

- [Node.js](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for Node.js.
- [Jasmine](https://www.npmjs.com/package/jasmine) - command line interface and supporting code for running Jasmine specs under Node.
- [Prettier](https://www.npmjs.com/package/prettier) - Opinionated Code Formatter
- [Sharp](https://www.npmjs.com/package/sharp) - high speed Node.js module is to convert large images in common formats
- [Nodemon](https://www.npmjs.com/package/nodemon) - Simple monitor script for use during development of a Node.js app.

## Installation

This project requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies.

```sh
cd image-processing-api
npm i
```

## Commands
- Building project
```sh
npm run build
```

- Starting the server
```sh
npm run start
```

- Running tests
```sh
npm run test
```

- Linting (Eslint)
```sh
npm run lint
```

- Formatting (Prettier)
```sh
npm run prettier
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

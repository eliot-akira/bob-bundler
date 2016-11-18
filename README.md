
# Bob Bundler

Opinionated bundler of JavaScript projects

## Install

```bash
npm install bob-bundler -g
```

..or as devDependency:

```bash
npm install bob-bundler -D
```

## Commands

#### `bob build`

- Build all

#### `bob dev`

- Build all
- Watch source folder(s) and compile on file change

## Configure

Set `bob` property in `package.json`

Example configuration

```js
"bob": {
  "browserify": {
    "src": "src/client/index.js",
    "dest": "build/client/app.js",
    "watch": "src/client/**/*.js"
  },
  "sass": {
    "src": "src/client/index.scss",
    "dest": "build/client/app.css",
    "watch": "src/**/*.scss"
  },
  "ejs": {
    "src": "src/client/index.html",
    "dest": "build/client/index.html",
    "watch": "src/**/*.html"
  },
  "babel": {
    "src": "src/server",
    "dest": "build/server",
    "watch": "src/server/**/*.js"
  },
  "nodemon": {
    "src": "build/server",
    "port": "3000"
  },
  "static": {
    "src": "build/client",
    "port": "3001"
  },
  "lint": {
    "src": "src/**/*.js"
  },
  "test": {
    "src": "tests/**/*.js"
  }  
}
```

## Babel presets

Presets `es2015` and `stage-0` are included by default.


# Bob Bundler

Bundle HTML, CSS, JS with optional server and live reload

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
- Watch and compile on file change
- If using nodemon or static server, live reload browser



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
    "watch": "src/client/**/*.scss"
  },
  "ejs": {
    "src": "src/client/index.html",
    "dest": "build/client",
    "watch": "src/client/**/*.html"
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
  }  
}
```

All tasks are optional. Each task can also be an array.

## Defaults

The following are included by default.

### Babel/browserify

- Presets: `es2015` and `stage-0`
- Plugin: `add-module-exports`

### Sass

- Autoprefixer

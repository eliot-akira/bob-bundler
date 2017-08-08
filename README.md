
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
  "html": {
    "src": "src/client/index.html",
    "dest": "build/client",
    "watch": "src/client/**/*.html"
  },
  "babel": {
    "src": "src/server",
    "dest": "build/server",
    "watch": "src/server/**/*.js"
  },
  "copy": {
    "src": "assets/**",
    "dest": "build/client",
    "watch": "assets/**"
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

## Examples

See `/examples` folder in this repo.

- `client` - Static site
- `client-react` - Static site with React
- `server` - Server only
- `fullstack` - Site with `express` server
- `fullstack-react` - **TODO:** React with server-side rendering

Run the example:

```bash
npm install && npm start
```

## Defaults

The following are included by default.

### Babel/browserify

- Presets: `es2015` and `stage-0`
- Plugins
  - `add-module-exports` - support direct `require` from `export default`
  - `transform-runtime` - async/await support

### Sass

- Autoprefixer - Last two browser versions

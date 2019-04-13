## Building front end files with NPM scripts only

- Compile Sass `css/style.scss → css/style.css`
- Minify CSS `css/style.css → dist/style.min.css`
- Lint and minify JS with Closure Compiler `js/script.js → dist/script.min.js`

**Usage**

> npm run build

**Installation**

In a project with `css/style.scss` and `js/script.js`, run

> npm i -D sass -g && npm i -D clean-css-cli -g && npm i -D closure-compiler

**Config**

Edit `package.json`

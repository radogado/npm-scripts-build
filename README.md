## Building front end files with NPM scripts only

- Compile Sass `css/style.scss → css/style.css`
- Minify CSS `css/style.css → dist/style.min.css`
- Combine ES6 Modules imported in `js/script.js` into `js/script-with-modules.js` with Rollup
- Lint and minify JS with Closure Compiler `js/script-with-modules.js → dist/script.min.js`
- Transpile `dist/script.min.js` with Babel to `dist/script.babel.js`. To do: include the Babel polyfill

**Usage**

> npm run build

**Installation**

In an NPM-initialized project with `css/style.scss` and `js/script.js`, run

> npm i -D sass -g && npm i -D clean-css-cli -g && npm i -D closure-compiler && npm i -D babel-cli -g && npm i -D @babel/polyfill && npm i -D rollup -g

and add this to the `"scripts"` section of `package.json`

    "sass": "sass css/style.scss css/style.css",
    "clean-css": "cleancss -o dist/style.min.css css/style.css",
    "closure-compiler": "npx google-closure-compiler --language_in=ECMASCRIPT6_STRICT --language_out=ECMASCRIPT_2015 --js=js/script-with-modules.js --js_output_file=dist/script.min.js",
    "babel": "babel --minified --compact true dist/script.min.js -o dist/script.babel.js",
    "rollup":	"rollup js/script.js --file js/script-with-modules.js --format iife",
    "build": "mkdir -p dist && npm run sass && npm run clean-css && npm run rollup && npm run closure-compiler && npm run babel"

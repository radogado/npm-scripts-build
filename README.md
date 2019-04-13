## Building front end files with NPM scripts only

- Compile Sass `css/style.scss → css/style.css`
- Minify CSS `css/style.css → dist/style.min.css`
- Lint and minify JS with Closure Compiler `js/script.js → dist/script.min.js`

**Usage**

> npm run build

**Installation**

In an NPM-initialized project with `css/style.scss` and `js/script.js`, run

> npm i -D sass -g && npm i -D clean-css-cli -g && npm i -D closure-compiler

and add this to the `"scripts"` section of `package.json`

    "sass": "sass css/style.scss css/style.css",
    "clean-css": "cleancss -o dist/style.min.css css/style.css",
    "closure-compiler": "npx google-closure-compiler --language_in=ECMASCRIPT6_STRICT --language_out=ECMASCRIPT_2015 --js=js/script.js --js_output_file=dist/script.min.js",
    "build": "mkdir -p dist && npm run sass && npm run clean-css && npm run closure-compiler"

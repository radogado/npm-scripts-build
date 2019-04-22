## Building front end files with NPM scripts only

- Compile Sass `css/style.scss` → `css/style.css`
- Minify CSS `css/style.css` → `dist/style.min.css`
- Include ES6 Modules imported in `js/script.js` in the main JS file with Rollup
- Combine CSS and JS from `components/*` and prepend them to the main CSS and JS
- Lint and minify JS with Closure Compiler `js/script-with-modules.js` → `dist/script.min.js`
- Transpile `dist/script.min.js` with Babel to `dist/script.babel.js`, prepended by the Babel polyfill
- Watch and build on `css/style.scss` changes

**Usage**

> npm run build

**Installation**

In an NPM-initialized project with `css/style.scss` and `js/script.js`, run

> npm i -D sass -g && npm i -D clean-css-cli -g && npm i -D closure-compiler && npm i -D babel-cli -g && npm i -D @babel/polyfill && npm i -D rollup -g && npm i -D onchange -g

and add this to the `"scripts"` section of `package.json`

    "components":           "cat components/**/*.scss > components/components.scss && cat components/**/*.js > components/components.js",
    "sass":                 "sass components/components.scss components/components.css && sass css/style.scss css/style.css && cat components/components.css css/style.css > css/style-with-components.css",
    "clean-css":            "cleancss -o dist/style.min.css css/style-with-components.css",
    "closure-compiler":     "cat components/components.js js/script-with-modules.js > js/script-with-components-and-modules.js && npx google-closure-compiler --language_in=ECMASCRIPT6_STRICT --language_out=ECMASCRIPT_2015 --js=js/script-with-components-and-modules.js --js_output_file=dist/script.min.js",
    "babel":                "babel --minified --compact true dist/script.min.js -o js/script.babel.js",
    "rollup":               "rollup js/script.js --file js/script-with-modules.js --format iife",
    "watch":                "onchange 'css/style.scss' -- npm run build",
    "build":                "mkdir -p dist && npm run sass && npm run clean-css && npm run rollup && npm run closure-compiler && npm run babel && cat ./node_modules/@babel/polyfill/dist/polyfill.min.js js/script.babel.js > dist/script.babel.js"

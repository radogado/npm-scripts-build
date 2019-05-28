## Building front end files with NPM scripts only

- Compile Sass `css/style.scss` → `css/style.css`
- Minify CSS `css/style.css` → `dist/style.min.css`
- Include ES6 Modules imported in `js/*.js` in the main JS file with Rollup
- Combine Sass and JS from `components/*`, compile Sass and prepend them to the main CSS and JS
- Lint and minify JS with Closure Compiler → `dist/script.min.js`
- Transpile `dist/script.min.js` with Babel to `dist/script.babel.js`, prepended with the Babel polyfill
- Watch and build on `css/style.scss` changes

**Usage**

> npm run css

> npm run build

> npm run watch

> npm run watch:css

**Installation**

In an NPM-initialized project with `css/style.scss` and `js/script.js`, run

> npm i -D sass -g && npm i -D clean-css-cli -g && npm i -D closure-compiler && npm i -D babel-cli -g && npm i -D @babel/polyfill && npm i -D rollup -g && npm i -D onchange -g

add this to the `"scripts"` section of `package.json`

    "components":       "cat components/**/*.scss > components/components.scss && cat components/**/*.js > components/components.js",
    "sass":             "sass components/components.scss components/components.css && sass $npm_package_config_css_folder/style.scss $npm_package_config_css_folder/style.css && cat components/components.css $npm_package_config_css_folder/style.css > $npm_package_config_css_folder/style-with-components.css",
    "clean-css":        "cleancss -o dist/style.min.css $npm_package_config_css_folder/style-with-components.css",
    "closure-compiler": "cat components/components.js temp/script.rollup.js > temp/script-with-components-and-modules.js && npx google-closure-compiler --language_in=ECMASCRIPT6_STRICT --language_out=ECMASCRIPT_2015 --js=temp/script-with-components-and-modules.js --js_output_file=dist/script.min.js",
    "babel":            "babel --minified --compact true dist/script.min.js -o temp/script.babel.js && cat ./node_modules/@babel/polyfill/dist/polyfill.min.js temp/script.babel.js > dist/script.babel.js",
    "rollup":           "rollup js/*.js --dir temp/rollup --format cjs && cat temp/rollup/*.js > temp/script.rollup.js",
    "watch":            "onchange '$npm_package_config_css_folder/style.scss' -- npm run build",
    "watch:css":        "onchange '$npm_package_config_css_folder/**/*.scss' 'components/**/*.scss' -e 'components/*.*' -- npm run css",
    "css":              "npm run components && npm run sass && npm run clean-css",
    "build":            "rm -rf temp && mkdir temp && npm run components && npm run sass && rm -rf dist && mkdir dist && npm run clean-css && npm run rollup && npm run closure-compiler && npm run babel && rm -rf temp"

and this to the `"config"` section:

    "css_folder":         "css",
    "js_folder":          "js"

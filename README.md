## Building front end files with NPM scripts only

- Compile Sass `css/style.scss` → `css/style.css`
- Minify CSS `css/style.css` → `dist/style.min.css`
- Include ES6 Modules imported in `js/*.js` in the main JS file with Rollup
- Combine Sass and JS from `components/*`, compile Sass and prepend them to the main CSS and JS
- Lint and minify JS with Closure Compiler → `dist/script.min.js`
- Transpile `dist/script.min.js` with Babel to `dist/script.babel.js`, prepended with the Babel polyfill
- Watch and build on `css/style.scss` changes
- Works on Windows Git Bash, Linux and Mac

**Usage**

> npm run css

> npm run build

> npm run watch

> npm run watch:css

**Installation**

In an NPM-initialized project with `css/style.scss` and `js/script.js`, run

> npm i -D node-sass && npm i -D clean-css-cli -g && npm i -D -g uglify-es && npm i -D babel-cli -g && npm i -D @babel/polyfill && npm i -D rollup -g && npm i -D onchange -g && npm i -D -g cross-var

add this to the `"scripts"` section of `package.json`

    "components":         "cross-var bash -c \"cat $npm_package_config_components_folder/**/*.scss > $npm_package_config_components_folder/components.scss && cat $npm_package_config_components_folder/**/*.js > $npm_package_config_components_folder/components.js\"",
    "sass":               "cross-var \"node-sass $npm_package_config_components_folder/components.scss $npm_package_config_components_folder/components.css && node-sass $npm_package_config_css_folder/style.scss $npm_package_config_css_folder/style.css && cat $npm_package_config_components_folder/components.css $npm_package_config_css_folder/style.css > $npm_package_config_css_folder/style-with-components.css\"",
    "clean-css":          "cross-var cleancss -o dist/style.min.css $npm_package_config_css_folder/style-with-components.css",
    "js":   			  "cross-var bash -c \"cat $npm_package_config_components_folder/components.js temp/script.rollup.js > temp/script-with-components-and-modules.js && uglifyjs temp/script-with-components-and-modules.js -o dist/script.min.js -c -m\"",
    "babel":              "babel --minified --compact true dist/script.min.js -o temp/script.babel.js && cat ./node_modules/@babel/polyfill/dist/polyfill.min.js temp/script.babel.js > dist/script.babel.js",
    "rollup":             "cross-var bash -c \"rollup $npm_package_config_js_folder/*.js --dir temp/rollup --format cjs --no-strict && cat temp/rollup/*.js > temp/script.rollup.js\"",
	"watch":              "cross-var bash -c \"npm-run-all --parallel watch:css watch:js watch:views watch:assets\"",
    "watch:css":          "cross-var bash -c \"onchange '$npm_package_config_css_folder/**/*.scss' '$npm_package_config_components_folder/**/*.scss' -e '$npm_package_config_components_folder/*.*' -- npm run css\"",
    "watch:js":           "cross-var bash -c \"onchange '$npm_package_config_js_folder/**/*.js' -- npm run js1\"",
    "watch:views":        "cross-var bash -c \"onchange 'src/*.html' -- npm run views\"",
    "watch:assets":       "cross-var bash -c \"onchange 'src/resources/assets/**/*.*' -- npm run assets\"",
    "css":                "npm run components && npm run sass && npm run clean-css",
    "build":              "rm -rf temp && mkdir temp && rm -rf dist && mkdir dist && (npm run custom || true) && npm run components && npm run sass && npm run clean-css && npm run rollup && npm run js && npm run babel && rm -rf temp"

and this to the `"config"` section:

    "components_folder":  "components",
    "css_folder":         "css",
    "js_folder":          "js"

and edit the values.

Optionally add a ``"custom"`` script.

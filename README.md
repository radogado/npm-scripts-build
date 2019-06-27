## Building front end files with NPM scripts only

- Compile Sass `css/style.scss` → `css/style.css`
- Minify CSS `css/style.css` → `dist/style.min.css`
- Include ES6 Modules imported in `js/*.js` in the main JS file with Rollup
- Combine Sass and JS from `components/*`, compile Sass and prepend them to the main CSS and JS
- Lint and minify JS with Closure Compiler → `dist/script.min.js`
- Transpile `dist/script.min.js` with Babel to `dist/script.babel.js`, prepended with the Babel polyfill
- Watch and build on changes
- Works on Windows Git Bash, Linux and Mac

**Usage**

> npm run build

> npm run watch

**Installation**

In an NPM-initialized project with `css/style.scss` and `js/script.js`, run

> npm i -D node-sass && npm i -D clean-css-cli -g && npm i -D babel-cli -g && npm i -D @babel/polyfill && npm i -D rollup -g && npm i -D onchange -g && npm i -D -g cross-var && npm i -D -g concurrently && npm i -D -g npm-run-all && npm i -D -g terser

add this to the `"scripts"` section of `package.json`

    "components:scss": 	"cross-var bash -c \"cat $npm_package_config_components_folder/**/*.scss > $npm_package_config_components_folder/components.scss\"",
    "components:js": 	"cross-var bash -c \"cat $npm_package_config_components_folder/**/*.js > $npm_package_config_components_folder/components.js\"",
    "sass:components": 	"cross-var bash -c \"node-sass $npm_package_config_components_folder/components.scss $npm_package_config_components_folder/components.css\"",
    "sass:style": 		"cross-var bash -c \"node-sass $npm_package_config_css_folder/style.scss $npm_package_config_css_folder/style.css\"",
    "sass": 			"concurrently \"npm:sass:components\" \"npm:sass:style\"",
    "csscat": 			"cross-var bash -c \"cat $npm_package_config_components_folder/components.css $npm_package_config_css_folder/style.css > dist/style.css\"",
    "cssmin": 			"cleancss -o dist/style.min.css dist/style.css",
    "jscat": 			"cross-var bash -c \"rollup $npm_package_config_js_folder/*.js --dir temp/rollup --format cjs --no-strict && cat temp/rollup/*.js > temp/rollup.js && cat $npm_package_config_components_folder/components.js temp/rollup.js > dist/script.js\"",
    "jsmin:dev": 		"terser dist/script.js -o dist/script.min.js -m",
    "jsmin:prod": 		"terser dist/script.js -o dist/script.min.js -m -c",
    "babel": 			"babel --minified --compact true dist/script.min.js -o temp/babel.js && cat ./node_modules/@babel/polyfill/dist/polyfill.min.js temp/babel.js > dist/script.babel.js",
    "beforebuild": 		"rm -rf temp && mkdir temp",
    "css": 				"run-s components:scss sass csscat cssmin",
    "js:dev": 			"run-s components:js jscat jsmin:dev",
    "js:prod": 			"run-s components:js jscat jsmin:prod babel",
    "build": 			"npm run build:dev",
    "build:css": 		"run-s beforebuild css afterbuild",
    "build:dev": 		"npm run beforebuild && concurrently \"npm:css\" \"npm:js:dev\" && npm run afterbuild",
    "build:prod": 		"npm run beforebuild && concurrently \"npm:css\" \"npm:js:prod\" && npm run afterbuild",
    "afterbuild": 		"rm -rf temp",

	"watch": 		"cross-var bash -c \"onchange '$npm_package_config_css_folder/**/*.scss' '$npm_package_config_components_folder/**/*.scss' '$npm_package_config_js_folder/*.js' '$npm_package_config_js_folder/**/*.js' -e '$npm_package_config_components_folder/*.*' -- npm run build:dev\"",
    "watch:css": 	"cross-var bash -c \"onchange '$npm_package_config_css_folder/**/*.scss' '$npm_package_config_components_folder/**/*.scss' -e '$npm_package_config_components_folder/*.*' -- npm run build:css\"",
    "watch:js": 	"cross-var bash -c \"onchange '$npm_package_config_js_folder/**/*.js' -- npm run js:dev\""

and this to the `"config"` section:

    "components_folder":  "components",
    "css_folder":         "css",
    "js_folder":          "js"

and edit the values.

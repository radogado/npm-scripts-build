## Building front end with NPM scripts only

- Compile Sass `css/style.scss → css/style.css`
- Minify CSS `css/style.css → dist/style.min.css`
- Lint JS `js/script.js`
- Minify JS with closure-compiler `js/script.js → dist/script.min.js`

> npm run build

Requires

> {
> 	"esversion": 6
> }

in `.jshintrc`

All other config in `package.json`
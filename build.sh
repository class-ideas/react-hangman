#!/bin/zsh

# Babel/Browserify
browserify src/js/index.js -d -t [ babelify ] -o build/js/bundle.js

# Sass
node-sass src/sass/main.scss >! build/css/main.css

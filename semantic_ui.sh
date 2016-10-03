#!/bin/bash
echo 'starting . . .'
cd semantic_ui/semantic/
echo 'gulp build . . .'
gulp build
echo 'copying css to static . . .'
cp dist/semantic.min.css ../../fivefrets/static/css/semantic.min.css
echo 'copying js to static . . .'
cp dist/semantic.min.js ../../fivefrets/static/js/semantic.min.js
echo 'copying theme'
cp -R dist/themes/ ../../fivefrets/static/css/
cd ../..
echo 'sucessfully completed . . .'

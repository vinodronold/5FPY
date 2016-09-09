#!/bin/bash
echo 'starting . . .'
cd semantic_ui/semantic/
echo 'gulp build . . .'
gulp build
echo 'copying css to static . . .'
cp dist/semantic.min.css ../../fivefrets/static/css/semantic.min.css
echo 'copying js to static . . .'
cp dist/semantic.min.js ../../fivefrets/static/css/semantic.min.js
cd ../..
echo 'sucessfully completed . . .'

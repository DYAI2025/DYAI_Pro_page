#!/bin/bash
mkdir -p public
cp *.html public/
cp *.css public/
cp *.js public/
echo "Build complete! Files copied to public/"
ls public/ | wc -l | xargs echo "Total files:"
#!/bin/bash

webpack --display-chunks --profile --color --config ./core/compiler/make_webpack_vendor.js

# gulp 'build:polyfill' --color --gulpfile ./core/compiler/make_pure_vendor.js
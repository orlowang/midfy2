#!/bin/bash

project_name=$1
if [ ! $project_name ]; then
  project_name="default"
fi
gulp 'webpack:Build DLLs' --prj-$project_name --gulpfile ./core/compiler/make_app_dev.babel.js
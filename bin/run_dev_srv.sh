#!/bin/bash

project_name=$1
if [ ! $project_name ]; then
  project_name="default"
fi
NODE_ENV=development gulp 'rundev' --prj-$project_name --gulpfile ./core/compiler/make_app_dev.babel.js

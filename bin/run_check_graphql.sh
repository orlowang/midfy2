#!/bin/bash

project_name=$1
if [ ! $project_name ]; then
  project_name="default"
fi
babel-node './core/compiler/check_graphql.js' --prj-$project_name

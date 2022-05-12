"use strict";
const paths = require("path");

// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/tutorial-webpack.html

module.exports = {
  process(src, filename) {
    return {code :`module.exports = ${JSON.stringify(paths.basename(filename))};`};
  },
  
};
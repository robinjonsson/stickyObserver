import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";

const pkg = require("./package.json");

export default [
  {
    input: pkg.module,
    output: {
      file: pkg.main,
      format: "iife",
      name: "stickyObserver"
    },
    plugins: [
      replace({
        delimiters: ["{{", "}}"],
        version: pkg.version
      }),
      babel({
        presets: [
          [
            "@babel/preset-env",
            {
              targets: ">0.5%, last 5 versions, ie > 10, not dead",
              loose: true
            }
          ]
        ]
      })
    ]
  },
  {
    input: "src/jquery.sticky-observer.js",
    output: {
      file: "dist/jquery.sticky-observer.js",
      format: "iife",
      name: "stickyObserver"
    },
    plugins: [
      replace({
        delimiters: ["{{", "}}"],
        version: pkg.version
      }),
      babel({
        presets: [
          [
            "@babel/preset-env",
            {
              targets: ">0.5%, last 5 versions, ie > 10, not dead",
              loose: true
            }
          ]
        ]
      })
    ]
  }
];

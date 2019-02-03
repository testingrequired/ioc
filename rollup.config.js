import babel from "rollup-plugin-babel";

export default [
  {
    input: "src/index.js",
    output: {
      file: "dist/ject.js",
      format: "cjs",
      sourcemap: "inline"
    },
    plugins: [
      babel({
        exclude: "node_modules/**"
      })
    ]
  },
  {
    input: "example/index.js",
    output: {
      file: "dist/example.js",
      format: "cjs"
    },
    plugins: [
      babel({
        exclude: "node_modules/**"
      })
    ]
  }
];

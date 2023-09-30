import babel from "@rollup/plugin-babel";

export default [
  {
    input: "src/client/components/rsc.js",
    output: {
      format: "esm",
      file: "dist/client.js",
    },
    plugins: [babel({ babelHelpers: "bundled", exclude: "node_modules/**" })],
  },
  {
    input: "src/server/index.js",
    output: {
      format: "esm",
      file: "dist/server.js",
    },
    plugins: [babel({ babelHelpers: "bundled", exclude: "node_modules/**" })],
  },
  {
    input: "src/eject.js",
    output: {
      format: "esm",
      file: "dist/eject.js",
    },
    plugins: [babel({ babelHelpers: "bundled", exclude: "node_modules/**" })],
  },
];

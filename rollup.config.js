import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss"; // Import the plugin

export default {
  input: "src/index.ts", // Entry point of your library
  output: {
    dir: "dist",
    format: "cjs", // CommonJS format for Node modules
    sourcemap: true,
  },
  plugins: [
    peerDepsExternal(), // Ensures peer dependencies are treated as externals
    resolve(), // Resolves third-party modules in node_modules
    commonjs(), // Converts CommonJS modules to ES6
    typescript(), // Transpiles TypeScript
    postcss(), // Adds PostCSS plugin for handling CSS imports
  ],
  external: ["react", "react-dom"], // Specify any dependencies that should be treated as externals
};

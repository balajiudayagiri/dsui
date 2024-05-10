import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss"; // Import the plugin
import stylexPlugin from "@stylexjs/rollup-plugin";

function excludeStories() {
  return {
    name: "exclude-stories", // this name will show up in warnings and errors
    resolveId(source) {
      if (source.endsWith(".stories.ts") || source.endsWith(".stories.tsx")) {
        return { id: source, external: true }; // Exclude stories from the bundle
      }
      return null; // Include everything else
    },
  };
}

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
    typescript({
      exclude: [
        "**/*.stories.tsx",
        "**/*.stories.ts",
        "**/__tests__/**",
        "**/?(*.)+(spec|test).*",
      ],
    }), // Transpiles TypeScript // Transpiles TypeScript
    postcss(), // Adds PostCSS plugin for handling CSS imports
    excludeStories(),
    stylexPlugin({
      // Required. File path for the generated CSS file.
      fileName: "./.dist/stylex.css",
      // default: false
      dev: false,
      // prefix for all generated classNames
      classNamePrefix: "x",
      // Required for CSS variable support
      unstable_moduleResolution: {
        type: "commonJS",
        // Assuming your config file is in the project root
        rootDir: new URL(".", import.meta.url).pathname,
      },
    }),
  ],
  external: ["react", "react-dom"], // Specify any dependencies that should be treated as externals
};

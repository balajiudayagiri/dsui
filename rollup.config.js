import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss"; // Import the plugin

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

const inputFiles = glob.sync("src/**/!(*.stories).{ts,tsx}");

export default {
  input: inputFiles, // Entry point of your library
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
    }), // Transpiles TypeScript
    postcss(), // Adds PostCSS plugin for handling CSS imports
    excludeStories(),
  ],
  external: ["react", "react-dom"], // Specify any dependencies that should be treated as externals
};

import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const require = createRequire(import.meta.url);
const withNextJsObfuscator = require("nextjs-obfuscator");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { minify: minifyHtml } = require("html-minifier-terser");
const glob = require("glob");
const fs = require("fs").promises;

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
};

class MinifyHtmlPlugin {
  constructor(options = {}) {
    this.options = Object.assign(
      {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeAttributeQuotes: true,
        useShortDoctype: true,
        keepClosingSlash: false,
        minifyCSS: true,
        minifyJS: true,
        sortAttributes: true,
        sortClassName: true,
      },
      options
    );
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapPromise("MinifyHtmlPlugin", async (compilation) => {
      try {
        const outDirs = [compiler.options.output?.path || path.join(__dirname, ".next")];

        const pattern = path.join(outDirs[0], "**/*.html");
        const files = glob.sync(pattern, { nodir: true });

        await Promise.all(
          files.map(async (file) => {
            try {
              const original = await fs.readFile(file, "utf8");
              const minified = await minifyHtml(original, this.options);
              await fs.writeFile(file, minified, "utf8");
            } catch (err) {
              compilation.warnings.push(new Error(`MinifyHtmlPlugin: failed to minify ${file}: ${err.message}`));
            }
          })
        );
      } catch (err) {
        compilation.warnings.push(new Error(`MinifyHtmlPlugin: unexpected error: ${err.message}`));
      }
    });
  }
}

nextConfig.webpack = (config, { dev, isServer }) => {
  if (!dev) {
    config.optimization = config.optimization || {};
    config.optimization.minimizer = config.optimization.minimizer || [];

    try {
      config.optimization.minimizer.push(new CssMinimizerPlugin({
        parallel: true,
        terserOptions: {},
      }));
    } catch (err) {}

    config.plugins = config.plugins || [];
    config.plugins.push(new MinifyHtmlPlugin());
  }

  return config;
};

const obfuscatorPlugin = withNextJsObfuscator(
  {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.9,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    disableConsoleOutput: true,
    stringArray: true,
    stringArrayEncoding: ["rc4"],
    stringArrayThreshold: 0.9,
    rotateStringArray: true,
    unicodeEscapeSequence: true,
    numbersToExpressions: true,
    simplify: true,
    debugProtection: false,
  },
  {
    enabled: "detect",
    patterns: [
      "./src/data/**/*.{js,ts,jsx,tsx}",
      "./src/stores/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
    ],

    obfuscateFiles: {
      buildManifest: false,
      ssgManifest: false,
      webpack: false,
      additionalModules: [],
    },

    log: true,
  }
);

export default obfuscatorPlugin(nextConfig);

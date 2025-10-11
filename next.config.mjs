import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const require = createRequire(import.meta.url);
const withNextJsObfuscator = require("nextjs-obfuscator");

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname),
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
      additionalModules: []
    },

    log: true
  }
);


export default obfuscatorPlugin(nextConfig);

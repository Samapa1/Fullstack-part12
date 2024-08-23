import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import stylisticJs from "@stylistic/eslint-plugin-js";
import js from "@eslint/js";

// const globals = require('globals');
const react = pluginReact;

const globalsBrowser = Object.assign({}, globals.browser, {
  AudioWorkletGlobalScope: globals.browser["AudioWorkletGlobalScope "],
});

delete globalsBrowser["AudioWorkletGlobalScope "];

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      react,
      "@stylistic/js": stylisticJs,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: "latest",
      },
      globals: {
        ...globalsBrowser,
      },
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-vars": "error",
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/linebreak-style": ["error", "unix"],
      // '@stylistic/js/quotes': ['error', 'single'],
      // "@stylistic/js/semi": ["error", "never"],
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-console": "off",
    },
  },
  // {
  //   "extends": ["eslint:recommended", "plugin:react/recommended"]
  // },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  eslintPluginPrettierRecommended,
];

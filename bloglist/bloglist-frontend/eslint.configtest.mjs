import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import stylisticJs from "@stylistic/eslint-plugin-js";
import js from "@eslint/js";

const react = pluginReact;
// const globals = require('globals');

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      react,
      "@stylistic/js": stylisticJs,
    },
    //   languageOptions: {
    //     parserOptions: {
    //       ecmaFeatures: {
    //         jsx: true,
    //       },
    //     },
    //   globals: {
    //     ...globals.browser,
    //   },
    // },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: "latest",
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "react/jsx-uses-react": "error",
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
      // '@stylistic/js/indent': [
      //   'error',
      //   2
      // ],
      // '@stylistic/js/linebreak-style': [
      //   'error',
      //   'unix'
      // ],
      // '@stylistic/js/quotes': [
      //   'error',
      //   'single'
      // ],
      // '@stylistic/js/semi': [
      //   'error',
      //   'never'
      // ],
      // 'eqeqeq': 'error',
      // // 'no-trailing-spaces': 'error',
      // 'object-curly-spacing': [
      //   'error', 'always'
      // ],
      // 'arrow-spacing': [
      //   'error', { 'before': true, 'after': true },
      // ],
      // 'no-console': 'off',
    },
  },
  // {
  //   "extends": ["eslint:recommended", "plugin:react/recommended"]
  // },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintPluginPrettierRecommended,
];

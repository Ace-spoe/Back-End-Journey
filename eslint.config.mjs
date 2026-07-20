//Default
// import js from "@eslint/js";
// import globals from "globals";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
//   { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
// ]);

// import globals from 'globals'

// export default [
//   {
//     files: ['**/*.js'],
//     languageOptions: {
//       sourceType: 'commonjs',
//       globals: { ...globals.node },
//       ecmaVersion: 'latest',
//     },
//   },
// ]

import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended,                    // ← Use ESLint's recommended rules
  {
    files: ['**/*.js'],                      // Apply to all .js files
    languageOptions: {
      sourceType: 'commonjs',                // We're using require/module.exports (not import/export)
      globals: { ...globals.node },          // Allow Node.js globals like `process`, `console`
      ecmaVersion: 'latest',
    },
    plugins: {
      '@stylistic/js': stylisticJs,          // Extra style rules (indent, quotes, etc.)
    },
    rules: {
      // Style rules
      '@stylistic/js/indent': ['error', 2],           // 2 spaces indentation
      '@stylistic/js/linebreak-style': ['error', 'unix'], // Use LF (\n) line endings
      '@stylistic/js/quotes': ['error', 'single'],    // Use single quotes
      '@stylistic/js/semi': ['error', 'never'],       // No semicolons at end of lines

      // Other useful rules
      eqeqeq: 'error',                                // Force === and !==
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],    // { key: value }
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',                            // Allow console.log during development
    },
  },
  {
    ignores: ['dist/**'],   // Don't lint files in the dist folder
  },
]
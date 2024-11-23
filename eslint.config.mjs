import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    env: {
      jest: true
    },
    plugins: ['jest'],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "import/prefer-default-export": 0,
    },
  },
];

import globals from 'globals';
import pluginJs from '@eslint/js';
import jestPlugin from 'eslint-plugin-jest';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      '**/node_modules',
      '**/lib',
      'commitlint.config.js',
      'jest.config.js',
    ],
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.jest } } },
  pluginJs.configs.recommended,
  {
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'import/prefer-default-export': 0,
      'jest/no-disabled-tests': 'warn', // 警告：不要禁用测试
      'jest/no-focused-tests': 'error', // 错误：不要使用仅运行的测试
      'jest/no-identical-title': 'error', // 错误：测试标题不能重复
    },
  },
];

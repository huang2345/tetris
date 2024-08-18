import globals from 'globals';
import pluginJs from '@eslint/js';
//使用eslint-config-prettier防止和prettier冲突
import prettier from 'eslint-config-prettier';

export default [
    prettier,
    { files: ['**/*.js'], languageOptions: { sourceType: 'module' } },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    {
        rules: {
            'no-unused-vars': 'warn',
            'no-undef': 'warn',
        },
        files: ['src/*.js'],
        ignores: [],
    },
];

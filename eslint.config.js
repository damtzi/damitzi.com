import { includeIgnoreFile } from '@eslint/compat';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import astro from 'eslint-plugin-astro';
import ts from 'typescript-eslint';
import globals from 'globals';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    ts.configs.recommended,
    astro.configs.recommended,
    stylistic.configs.customize({
        indent: 4,
        quotes: 'single',
        semi: true
    }),
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    },
    {
        plugins: {
            '@stylistic': stylistic,
            'unicorn': eslintPluginUnicorn
        },
        rules: {
            'no-console': ['warn'],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@stylistic/comma-dangle': ['error', 'never'],
            'unicorn/filename-case': [
                'error',
                {
                    case: 'kebabCase',
                    ignore: ['README.md']
                }
            ],
            // typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
            // see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
            'no-undef': 'off'
        }
    },
    {
        files: ['**/*.astro'],
        languageOptions: {
            parser: astro.parser,
            parserOptions: {
                parser: ts.parser,
                extraFileExtensions: ['.astro'],
                sourceType: 'module',
                ecmaVersion: 'latest',
                project: './tsconfig.json'
            }
        },
        rules: {
            '@stylistic/jsx-one-expression-per-line': ['off']
        }
    }
);

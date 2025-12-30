import { includeIgnoreFile } from '@eslint/compat';
import { fileURLToPath } from 'node:url';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig(
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs.recommended,
    prettier,
    ...svelte.configs.prettier,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        plugins: {
            'unicorn': eslintPluginUnicorn
        },
        rules: {
            'no-console': ['warn'],
            '@typescript-eslint/no-explicit-any': 'warn',
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
        files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],

        languageOptions: {
            parserOptions: {
                projectService: true,
                extraFileExtensions: ['.svelte'],
                parser: ts.parser,
                svelteConfig
            }
        },

        rules: {
            // @see https://github.com/sveltejs/eslint-plugin-svelte/issues/1353
            'svelte/no-navigation-without-resolve': 'off'
        }
    }
);

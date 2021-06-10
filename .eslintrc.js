module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true
    },
    extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:sonarjs/recommended',
        'plugin:unicorn/recommended',
        'airbnb-base'
    ],
    plugins: [
        'import',
        'no-loops',
        'simple-import-sort',
        'sonarjs',
        'unicorn'
    ],
    overrides: [
        {
            files: [
                '.eslintrc.js',
                'webpack.config.js'
            ],
            env: {
                node: true
            },
            rules: {
                'unicorn/prefer-module': 'off' // eslint does not support ES modules usage in configuration files
            }
        },
        {
            files: ['src/**'],
            plugins: [
                '@typescript-eslint'
            ],
            extends: [
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking'
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: 'tsconfig.json',
                tsconfigRootDir: '.',
                sourceType: 'module'
            },
            settings: {
                'import/parsers': {
                    '@typescript-eslint/parser': ['.ts']
                },
                'import/resolver': {
                    typescript: {
                        alwaysTryTypes: true
                    }
                }
            },
            rules: {
                '@typescript-eslint/member-delimiter-style': 'error',
                '@typescript-eslint/no-empty-function': 'error',
                '@typescript-eslint/no-useless-constructor': 'error',
                '@typescript-eslint/no-explicit-any': 'off',
                '@typescript-eslint/no-shadow': 'error',
                '@typescript-eslint/semi': 'error',
                'no-shadow': 'off', // in favor of @typescript-eslint/no-shadow
                semi: 'off', // in favor of @typescript-eslint/semi
                'unicorn/prevent-abbreviations': [
                    'error', {
                        allowList: {
                            arg: true,
                            'i-have-adapter': true,
                            'i-have-endpoints': true,
                            params: true,
                            TParams: true
                        }
                    }
                ]
            }
        }
    ],
    rules: {
        'import/extensions': ['error', 'never'],
        'import/no-extraneous-dependencies': [
            'error', {
                devDependencies: true
            }
        ],
        'import/order': 'off',
        'import/prefer-default-export': 'off',
        'no-loops/no-loops': 'error',
        'unicorn/no-null': 'off',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'comma-dangle': ['error', 'never'],
        'eol-last': ['error', 'never'],
        indent: ['error', 4],
        'max-classes-per-file': 'warn',
        'max-len': ['error', 120],
        'no-empty-function': 'off',
        'no-trailing-spaces': 'error',
        'no-useless-constructor': 'off',
        quotes: ['error', 'single'],
        'sort-imports': 'off', // in favor of simple-import-sort plugin
        // forEach is not less readable when you are familiar to functional collection methods
        'unicorn/no-array-for-each': 'off',
        'unicorn/no-array-reduce': 'off' // not "in almost every case" reduce calls should be replaced with for loops
    }
};
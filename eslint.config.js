import js from '@eslint/js'
import nextPlugin from 'eslint-config-next'
import prettierPlugin from 'eslint-plugin-prettier'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    },
    plugins: {
      'prettier': prettierPlugin,
      'react-hooks': reactHooksPlugin
    },
    rules: {
      'prettier/prettier': 'warn',
      'no-unused-vars': 'off',
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error', 'info', 'log']
        }
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@next/next/no-img-element': 'warn',
      'react/no-children-prop': 'warn',
      'semi': ['error', 'never']
    }
  }
] 
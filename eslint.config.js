import nextPlugin from '@next/eslint-plugin-next'
import prettierPlugin from 'eslint-plugin-prettier'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

export default [
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'prettier': prettierPlugin,
      'react-hooks': reactHooksPlugin,
      '@next': nextPlugin
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
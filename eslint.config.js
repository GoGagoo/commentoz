import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'

export default [
	js.configs.recommended,

	...tseslint.configs.recommended,

	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		plugins: {
			react: reactPlugin,
		},
		rules: {
			'no-undef': 'off',
			'@typescript-eslint/no-require-imports': 'off',
		},
		languageOptions: {
			globals: {
				module: true,
				require: true,
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
]

import stylelintConfig from 'stylelint-config-standard-scss'
import stylelintScss from 'stylelint-scss'

export default {
	extends: [stylelintConfig],
	plugins: [stylelintScss],
	rules: {
		'no-empty-source': null,
		'at-rule-no-unknown': null,
		'scss/at-rule-no-unknown': true,
		'selector-class-pattern': null,
	},
	overrides: [
		{
			files: ['**/*.module.scss'],
			rules: {
				'selector-class-pattern': null,
				'scss/percent-placeholder-pattern': null,
			},
		},
	],
}

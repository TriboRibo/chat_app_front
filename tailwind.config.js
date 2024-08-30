/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			scale: {
				'102': '1.02',
			}
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				'default': {
					'primary': '#ffffff', // Custom primary color
					'secondary': '#cccccc', // Custom secondary color
					'accent': '#e5e5e5', // Custom accent color
					'neutral': '#ffffff', // Custom neutral color
					'base-100': '#ffffff', // Custom base background color
				},
			},
			'retro',
			'cyberpunk',
			'valentine',
			'aqua',
		],
	},
}


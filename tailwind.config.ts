import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import { skeleton } from '@skeletonlabs/tw-plugin';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {},
		colors: {
			darkBlue: '#23394A',
			inputBg: '#445867',
			inputColor: '#DEDBDB',
			red: '#ff3333',
			gray: '#d3d3d3',
			dark: '#000000',
			white: '#fff',
			success: '#86EFAC',
			error: '#F87171'
		},
		gridTemplateColumns: {
			login: '35% 1fr',
			loginMobile: '1fr'
		}
	},
	plugins: [
		forms,
		skeleton({
			themes: {
				preset: [
					{
						name: 'skeleton',
						enhancements: true
					}
				]
			}
		})
	]
} satisfies Config;

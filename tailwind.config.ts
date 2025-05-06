
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// SkillSprint custom colors - Enhanced with more vibrant options
				skillpurple: {
					50: '#f5f3ff',
					100: '#ede9fe',
					200: '#ddd6fe',
					300: '#c4b5fd',
					400: '#9b87f5', // Main primary color
					500: '#7e69ab', // Darker primary
					600: '#6e59a5',
					700: '#5a4a8a',
				},
				// New vibrant color palette for codedex-style design
				neo: {
					purple: '#8E2DE2',
					blue: '#4A00E0',
					teal: '#2193b0',
					cyan: '#6dd5ed',
					green: '#11998e',
					lime: '#38ef7d',
					orange: '#f46b45',
					yellow: '#eea849',
					pink: '#F27121',
					red: '#E94057',
					violet: '#8A2387',
					indigo: '#512DA8',
				},
				// Dark theme colors
				dark: {
					background: '#1A1F2C',
					card: '#221F26',
					muted: '#403E43',
					border: '#333333',
					accent: '#555555',
				},
				softgreen: '#F2FCE2',
				softyellow: '#FEF7CD',
				softorange: '#FEC6A1',
				softpurple: '#E5DEFF',
				softpink: '#FFDEE2',
				softpeach: '#FDE1D3',
				softblue: '#D3E4FD',
				softgray: '#F1F0FB',
				// New vibrant versions
				vibrant: {
					green: '#00F260',
					yellow: '#FFDD00',
					orange: '#FF9900',
					purple: '#A742DF',
					pink: '#FF66C4',
					peach: '#FF7E5F',
					blue: '#0072FF',
					cyan: '#00FFFF',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'pulse-glow': {
					'0%, 100%': { 
						opacity: 1,
						boxShadow: '0 0 20px rgba(155, 135, 245, 0.5)'
					},
					'50%': { 
						opacity: 0.8,
						boxShadow: '0 0 40px rgba(155, 135, 245, 0.8)'
					},
				},
				'shine': {
					'0%': { backgroundPosition: '200% center' },
					'100%': { backgroundPosition: '-200% center' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 5s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'shine': 'shine 8s ease-in-out infinite',
			},
			backgroundImage: {
				'grid-pattern': 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
				'hero-gradient': 'linear-gradient(to right, #4A00E0, #8E2DE2)',
				'card-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				'highlight-gradient': 'linear-gradient(45deg, #FF9A9E, #FAD0C4)',
				'cta-gradient': 'linear-gradient(to right, #FC5C7D, #6A82FB)',
				'dark-gradient': 'linear-gradient(to bottom, #1A1F2C, #252A3C)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

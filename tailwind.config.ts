
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
				// Removed skillpurple colors and replaced with skillblue
				skillblue: {
					50: '#e6f1ff',
					100: '#cce3ff',
					200: '#99c8ff',
					300: '#66adff',
					400: '#3392ff', // Enhanced primary blue
					500: '#0077ff',
					600: '#0062cc',
					700: '#004d99',
				},
				// Enhanced neon colors for dark theme - changed purple to various blues
				neo: {
					blue: '#3392ff', // Main blue
					cyan: '#23accc',
					teal: '#057b94',
					navy: '#0a4d68', // Deep navy blue
					indigo: '#173966',
					green: '#2ae0b0',
					lime: '#95f2b8',
					orange: '#ff7a59',
					yellow: '#ffcc41',
					pink: '#ff5792',
					red: '#ff4570',
				},
				// Dark theme colors - slightly adjusted
				dark: {
					background: '#151822', // Made slightly darker
					card: '#1c1f2d', // Adjusted for better contrast
					muted: '#2d303a',
					border: '#333440',
					accent: '#464958',
				},
				softgreen: '#F2FCE2',
				softyellow: '#FEF7CD',
				softorange: '#FEC6A1',
				softblue: '#D3E4FD', // Kept as is
				softpink: '#FFDEE2',
				softpeach: '#FDE1D3',
				// Added new
				softnavyblue: '#E5ECF5',
				softgray: '#F1F0FB',
				// Vibrant versions - made more neon for dark theme
				vibrant: {
					green: '#00F260',
					yellow: '#FFDD00',
					orange: '#FF9900',
					blue: '#0077ff', // Enhanced blue
					navy: '#0a4d68', // Deep navy
					cyan: '#00FFFF',
				}
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				display: ['JetBrains Mono', 'monospace'],
				code: ['Fira Code', 'monospace'],
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
						boxShadow: '0 0 20px rgba(51, 146, 255, 0.5)' // Changed to blue glow
					},
					'50%': { 
						opacity: 0.8,
						boxShadow: '0 0 40px rgba(51, 146, 255, 0.8)' // Changed to blue glow
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
				'hero-gradient': 'linear-gradient(to right, #0a4d68, #23accc)',
				'card-gradient': 'linear-gradient(135deg, #173966 0%, #3392ff 100%)',
				'highlight-gradient': 'linear-gradient(45deg, #3392ff, #23accc)',
				'cta-gradient': 'linear-gradient(to right, #0a4d68, #3392ff)',
				'dark-gradient': 'linear-gradient(to bottom, #1A1F2C, #252A3C)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

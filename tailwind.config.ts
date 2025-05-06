
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
				skillnavy: {
					50: '#e6f0fb',
					100: '#cce1f7',
					200: '#99c4ef',
					300: '#66a6e7',
					400: '#3388df', // Enhanced primary navy
					500: '#1a6bc7',
					600: '#14559f',
					700: '#104077',
				},
				// Enhanced neon colors for dark theme with navy as primary
				neo: {
					navy: '#1a6bc7', // Primary navy blue
					blue: '#3388df', // Secondary navy blue
					teal: '#23accc',
					cyan: '#57d4f4',
					green: '#2ae0b0',
					lime: '#95f2b8',
					orange: '#ff7a59',
					yellow: '#ffcc41',
					pink: '#ff5792',
					red: '#ff4570',
					violet: '#3d5afa',
					indigo: '#3d5afa',
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
				softnavy: '#D3E4FD',
				softpink: '#FFDEE2',
				softpeach: '#FDE1D3',
				softblue: '#D3E4FD',
				softgray: '#F1F0FB',
				// Vibrant versions - made more neon for dark theme
				vibrant: {
					green: '#00F260',
					yellow: '#FFDD00',
					orange: '#FF9900',
					navy: '#1a6bc7', // Enhanced navy
					blue: '#3388df', // Enhanced blue
					peach: '#FF7E5F',
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
						boxShadow: '0 0 20px rgba(26, 107, 199, 0.5)'
					},
					'50%': { 
						opacity: 0.8,
						boxShadow: '0 0 40px rgba(26, 107, 199, 0.8)'
					},
				},
				'shine': {
					'0%': { backgroundPosition: '200% center' },
					'100%': { backgroundPosition: '-200% center' },
				},
				'orbit': {
					'0%': { transform: 'rotate(0deg) translateX(10px) rotate(0deg)' },
					'100%': { transform: 'rotate(360deg) translateX(10px) rotate(-360deg)' },
				},
				'bounce-slow': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 5s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'shine': 'shine 8s ease-in-out infinite',
				'orbit': 'orbit 8s linear infinite',
				'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
				'spin-slow': 'spin-slow 10s linear infinite',
			},
			backgroundImage: {
				'grid-pattern': 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
				'hero-gradient': 'linear-gradient(to right, #1a6bc7, #3d5afa)',
				'card-gradient': 'linear-gradient(135deg, #1a6bc7 0%, #3d5afa 100%)',
				'highlight-gradient': 'linear-gradient(45deg, #3388df, #57d4f4)',
				'cta-gradient': 'linear-gradient(to right, #1a6bc7, #3388df)',
				'dark-gradient': 'linear-gradient(to bottom, #1A1F2C, #252A3C)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

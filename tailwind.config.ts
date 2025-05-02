
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
				// Enhanced Retro Windows 98 colors
				retro: {
					'blue': '#0000AA',
					'lightblue': '#1084d0',
					'darkblue': '#000080', // Windows 98 title bar blue
					'lightgray': '#D4D0C8', // Windows 98 background
					'darkgray': '#808080',
					'cyan': '#00AAAA',
					'green': '#00AA00',
					'title': '#000080',
					'button': '#C0C0C0',
					'buttonhighlight': '#FFFFFF',
					'buttonshadow': '#808080',
					'window': '#ECECEC',
					'windowframe': '#DFDFDF',
					'windowtext': '#000000',
					'desktop': '#008080', // Classic teal desktop
					'menubar': '#D4D0C8', 
					'menutext': '#000000',
					'highlight': '#0000AA', // Selected item highlight
					'highlighttext': '#FFFFFF',
					'graytext': '#808080',
					'infobackground': '#FFFFE1',
					'infotext': '#000000'
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
				'connecting': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'loading-dots': {
					'0%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-0.5rem)' },
					'100%': { transform: 'translateY(0)' }
				},
				'marquee': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				'blink': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' }
				},
				'shake': {
					'0%, 100%': { transform: 'translateX(0)' },
					'10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
					'20%, 40%, 60%, 80%': { transform: 'translateX(2px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'connecting': 'connecting 1.5s infinite ease-in-out',
				'loading-dot-1': 'loading-dots 1s infinite ease-in-out',
				'loading-dot-2': 'loading-dots 1s infinite ease-in-out 0.2s',
				'loading-dot-3': 'loading-dots 1s infinite ease-in-out 0.4s',
				'marquee': 'marquee 10s linear infinite',
				'blink': 'blink 1s step-end infinite',
				'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both'
			},
			fontFamily: {
				'ms-sans': ['"MS Sans Serif"', 'Pixelated MS Sans Serif', 'MS Sans Serif', '"Microsoft Sans Serif"', 'sans-serif'],
				'vt323': ['VT323', 'monospace']
			},
			boxShadow: {
				'win98': 'inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px gray, inset 2px 2px #fff',
				'win98-inset': 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey'
			},
			backgroundImage: {
				'win98-gradient': 'linear-gradient(90deg, #000080, #1084d0)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

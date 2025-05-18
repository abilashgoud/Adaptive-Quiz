/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
        // Custom colors for the quiz app
        easy: {
          light: 'hsl(130, 70%, 90%)', // Lighter green
          DEFAULT: 'hsl(130, 60%, 50%)', // Main green
          dark: 'hsl(130, 60%, 30%)', // Darker green text
        },
        medium: {
          light: 'hsl(45, 100%, 88%)', // Lighter yellow
          DEFAULT: 'hsl(45, 100%, 60%)', // Main yellow
          dark: 'hsl(45, 80%, 35%)', // Darker yellow text
        },
        hard: {
          light: 'hsl(0, 100%, 90%)', // Lighter red
          DEFAULT: 'hsl(0, 90%, 60%)', // Main red
          dark: 'hsl(0, 70%, 40%)', // Darker red text
        }
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 6px)', 
        '2xl': 'calc(var(--radius) + 12px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
        'flipInY': {
          '0%': { transform: 'perspective(400px) rotateY(90deg)', opacity: '0' },
          '100%': { transform: 'perspective(400px) rotateY(0deg)', opacity: '1' },
        },
        'pulse-correct': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 hsla(var(--primary), 0.7)' },
          '50%': { transform: 'scale(1.03)', boxShadow: '0 0 0 10px hsla(var(--primary), 0)' },
        },
        'shake-incorrect': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-6px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(6px)' },
        },
        'slide-in-bottom': {
          '0%': { transform: 'translateY(50px)', opacity: '0'},
          '100%': { transform: 'translateY(0)', opacity: '1'}
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'gradient-flow': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
        'flipInY': 'flipInY 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'pulse-correct': 'pulse-correct 0.6s ease-in-out',
        'shake-incorrect': 'shake-incorrect 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'slide-in-bottom': 'slide-in-bottom 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'gradient-flow': 'gradient-flow 10s ease infinite',
			},
      boxShadow: {
        'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'soft-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.07), 0 10px 10px -5px rgba(0, 0, 0, 0.03)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
      },
      backgroundImage: {
        'gradient-primary-accent': 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))',
      },
		},
	},
	plugins: [require('tailwindcss-animate')],
};
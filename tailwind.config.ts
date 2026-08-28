import type { Config } from 'tailwindcss';
export default { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { navy: '#0A1B3D', gold: '#D4A537', cream: '#F7F5F0', ink: '#1B2433' }, fontFamily: { sans: ['Arial', 'sans-serif'], display: ['Georgia', 'serif'] }, boxShadow: { soft: '0 18px 45px rgba(10,27,61,.11)' } } }, plugins: [] } satisfies Config;

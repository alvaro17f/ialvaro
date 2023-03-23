/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                azama: {
                    primary: '#5DE4c7',
                    secondary: '#a6accd',
                    success: '#5fb3a1',
                    danger: '#d0679d',
                    warning: '#fffac2',
                    info: '#89ddff',
                    light: '#e4f0fb',
                    dark: '#1b1e28',
                    muted: '#303340',
                    white: '#ffffff',
                }
            }
        }
    },
    plugins: []
};

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#2577c1',
                'secondary-bg': '#fff',
                'theme': '#fff',
                'dark-primary': '#ff500b',
                'dark-secondary-bg': '#424242',
                'dark-theme': '#424242'
            }
        },
    },
    plugins: [],
}
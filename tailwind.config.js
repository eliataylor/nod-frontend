const defaultTheme = require('tailwindcss/defaultTheme')
const windmill = require('@windmill/react-ui/config')

const config = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/@windmill/react-ui/lib/defaultTheme.js',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            boxShadow: {
                bottom: '0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)',
            },
            backgroundColor: {
                'custom-gray': '#d9e2f3',
                'custom-green': '#e2efd9',
                'custom-yellow': '#fef2cb',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
}

const windmillObj = { ...windmill(config) }
delete windmillObj.purge

module.exports = {
    ...windmillObj,
    ...config,
}

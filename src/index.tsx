import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createTheme, responsiveFontSizes, ThemeProvider} from '@mui/material/styles';
// import { typography } from '@mui/styles';
import reportWebVitals from './reportWebVitals';
import {CartProvider} from "./CartProvider";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

let theme = createTheme({
    palette: {
        primary: {
            main: '#3B5700',
        },
        secondary:{
            main: '#bf741f'
        }
    },
    typography: {
        fontSize: 14,
        fontFamily: [
            'Jost',
            '"Segoe UI"',
            'Roboto',
            'Arial',
            'sans-serif'
        ].join(',')
    },
});


theme = responsiveFontSizes(theme);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CartProvider>
                <App/>
            </CartProvider>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

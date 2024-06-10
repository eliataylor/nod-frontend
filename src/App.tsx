import * as React from 'react';
import Router from "./Router";
import {CartProvider} from "./CartProvider";
import {ThemeProvider} from "./theme/ThemeContext";
import {NavDrawerProvider} from "./NavDrawerProvider";
import TrackingConsent from "./components/TrackingConsent";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

export default function App() {

    return (<ThemeProvider>
            <NavDrawerProvider>
                <TrackingConsent/>
                <CartProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Router/>
                    </LocalizationProvider>
                </CartProvider>
            </NavDrawerProvider>
        </ThemeProvider>
    );
}

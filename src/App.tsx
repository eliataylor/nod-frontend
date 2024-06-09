import * as React from 'react';
import Router from "./Router";
import {CartProvider} from "./CartProvider";
import {ThemeProvider} from "./theme/ThemeContext";
import {NavDrawerProvider} from "./NavDrawerProvider";
import TrackingConsent from "./components/TrackingConsent";


export default function App() {

    return (<ThemeProvider>
            <NavDrawerProvider>
                <TrackingConsent />
                <CartProvider>
                    <Router/>
                </CartProvider>
            </NavDrawerProvider>
        </ThemeProvider>
    );
}

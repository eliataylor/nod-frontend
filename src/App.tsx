import * as React from 'react';
import Router from "./Router";
import {CartProvider} from "./CartProvider";
import {ThemeProvider} from "./theme/ThemeContext";
import {NavDrawerProvider} from "./NavDrawerProvider";
import CookieConsent from "react-cookie-consent";


export default function App() {

    return (<ThemeProvider>
            <NavDrawerProvider>
                <CookieConsent
                    onAccept={(acceptedByScrolling) => {
                        if (acceptedByScrolling) {
                            // triggered if user scrolls past threshold
                            alert("Accept was triggered by user scrolling");
                        } else {
                            alert("Accept was triggered by clicking the Accept button");
                        }
                    }}
                ></CookieConsent>
                <CartProvider>
                    <Router/>
                </CartProvider>
            </NavDrawerProvider>
        </ThemeProvider>
    );
}

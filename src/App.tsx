import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Router from "./Router";


export default function App() {

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <Router />
        </Box>
    );
}

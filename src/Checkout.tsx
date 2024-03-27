import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <Box style={{textAlign: 'center'}}>
            <Typography variant={'body1'} style={{maxWidth:400, margin:'auto'}} >
                We're rolling this out as a Lean Startup
            </Typography>
            <Typography variant={'body1'} style={{maxWidth:400, margin:'20px auto'}} >
                While we work on a formal ordering system. PLEASE:

                - pay your deposit via and method
                - copy your order from this text field
                - Email it to orders@nourishmentondemand.com
            </Typography>

            <img src={'/venmo.jpeg'} width={300} />
        </Box>
    );
};

export default Home;

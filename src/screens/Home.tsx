import React from 'react';
import {Box, Grid, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import Logo from "../theme/Logo";
import {ThemedButton} from "../theme/GlobalStyles";

const Home = () => {
    return (
        <Grid container direction={'column'} gap={4} sx={{textAlign: 'center', maxWidth:400, margin:'70px auto'}}>
            <Box>
                <Logo height={325} />
            </Box>
            <Typography variant={'body1'} style={{maxWidth:325, margin:'auto'}} >
                NOD stands for Nourishment On-Demand, reflecting our commitment to nourishing you when your body needs it most.
            </Typography>
            <Link to="/menus">
                <ThemedButton sx={{mt:2, fontWeight:800}} variant={'contained'}>
                    Place Your Order
                </ThemedButton>
            </Link>
        </Grid>
    );
};

export default Home;

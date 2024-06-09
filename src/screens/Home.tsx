import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import Logo from "../Logo";

const Home = () => {
    return (
        <Box style={{textAlign: 'center'}}>
            <Box>
                <Logo height={250} />
            </Box>
            <Button variant={'contained'} component={Link} to={'/next-week'} style={{margin:'50px 0', background:'#202020'}}>Create Your Meal Plan</Button>
            <Typography variant={'body1'} style={{maxWidth:400, margin:'auto'}} >
                NOD stands for Nourishment On-Demand, reflecting our commitment to nourishing you when your body needs
                it most.

                Balancing meals amidst a busy schedule can be challenging, skewed meal timings can lead to mood swings
                and energy crashes—cue the term "hangry." That's where our meal prep service steps in. Beyond just
                providing nutritious options, we understand the importance of convenience. By offering balanced,
                wholesome meals, we aim to stabilize blood sugar levels, supporting not only physical health but also
                mental clarity and emotional balance. We believe that nourishing the body with the right foods can
                foster a happier, healthier mind, even on the busiest of days.
            </Typography>
        </Box>
    );
};

export default Home;

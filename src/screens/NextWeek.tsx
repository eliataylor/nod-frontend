import React from 'react';
import {Box, Typography} from "@mui/material";

const MealPlan = () => {
    return (
        <Box style={{textAlign: 'center'}}>
            <Typography variant={'h5'} >
                HEALTHY MEAL PREP SERVICE
            </Typography>
            <Typography variant={'body1'} style={{maxWidth:400, margin:'auto'}} >
                Balancing meals amidst a busy schedule can be challenging, skewed meal timings can lead to mood swings and energy crashes—cue the term "hangry." That's where our meal prep service steps in. Beyond just providing nutritious options, we understand the importance of convenience. By offering balanced, wholesome meals, we aim to stabilize blood sugar levels, supporting not only physical health but also mental clarity and emotional balance. We believe that nourishing the body with the right foods can foster a happier, healthier mind, even on the busiest of days.
            </Typography>
        </Box>
    );
};

export default MealPlan;

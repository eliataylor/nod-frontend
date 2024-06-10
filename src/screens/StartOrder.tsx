import React from 'react';
import {Grid, Typography} from "@mui/material";
import {ThemedButton} from "../theme/GlobalStyles";
import {Link} from "react-router-dom";

const StartOrder: React.FC = () => {
    return (
        <Grid container direction={'column'} gap={2} sx={{textAlign: 'center', maxWidth: 600, margin: '50px auto'}}>
            <Typography variant={'h5'}>
                WHAT KIND OF ORDER ARE YOU PLACING?
            </Typography>
            <Typography variant={'body1'} sx={{mt: 2, mb: 4}}>
                We're thrilled to embark on this journey with you! Let's kickstart the process of simplifying your daily
                nutrition goals. Your body (and mind) will soon be feeling the difference.
            </Typography>
            <Grid item container direction={'column'} gap={4} >
                <Grid item xs={12} component={Link} to="/menus/next-week/pricing" >
                    <ThemedButton sx={{width: 300, margin: 'auto'}}>
                        HEALTHY MEAL PREP
                    </ThemedButton>
                </Grid>
                <Grid item xs={12} component={Link} to="/menus/postpartum-plan/pricing">
                    <ThemedButton sx={{width: 300, margin: 'auto'}}>
                        POSTPARTUM MEAL PREP
                    </ThemedButton>
                </Grid>
                <Grid item xs={12} component={Link} to="/menus/postpartum-gift">
                    <ThemedButton sx={{width: 300, margin: 'auto'}}>
                        POSTPARTUM MEAL GIFT
                    </ThemedButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default StartOrder;

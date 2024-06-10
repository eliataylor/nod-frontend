import React from 'react';
import {Grid, Typography} from "@mui/material";

const Partners = () => {
    return (
        <Grid container direction={'column'} gap={4} sx={{textAlign: 'center', maxWidth: 400, margin: '50px auto'}}>
            <Typography variant={'h5'} sx={{mb: 2, fontWeight: 800}}>
                WORK WITH US!
            </Typography>
            <Typography variant={'body1'}>
                We're actively seeking partnerships with spas, medspas, and plastic surgery clinics.
            </Typography>
            <Typography variant={'body1'}>
                Our services include:
                <ul>
                    <li>Meal prep programs offered have options that cater to focus on beauty from within and cater to
                        gut and skin health.
                    </li>
                    <li>Juice cleanses that are designed to replenish essential minerals and micronutrients.</li>
                    <li>Specialized meal options designed for post-op clientele in cosmetic surgery clinics.</li>
                </ul>
            </Typography>
            <Typography variant={'body1'}>
                If you're interested in collaborating with us, please don't hesitate to reach out to us directly
                at <a href={"mailto:info@nourishmentondemand.com"}>info@nourishmentondemand.com</a>. We're excited to connect with you!
            </Typography>
        </Grid>
    );
};

export default Partners;

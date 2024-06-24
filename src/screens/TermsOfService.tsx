import React from 'react';
import {Grid, Typography} from "@mui/material";

interface TermsOfService {
    anchor?: string;
}

const TermsOfService: React.FC<TermsOfService> = ({ anchor }) => {
    return (
        <Grid container direction={'column'} gap={2} sx={{textAlign: 'center', maxWidth:400, margin:'50px auto'}}>
            <Typography variant={'h5'} >
                Terms Of Service
            </Typography>
            <Typography variant={'h6'} >
                We don't sell your data to anyone, ever, for any reason whatsoever.
            </Typography>
            <Typography variant={'body1'} >
                We use Google Analytics to track general visitor traffic and improve our user experience
            </Typography>
            <Typography variant={'body1'} >
                We only store user data to support and fulfil your online orders
            </Typography>
        </Grid>
    );
};

export default TermsOfService;

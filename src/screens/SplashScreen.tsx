import React from 'react';
import {CircularProgress, Grid, SvgIcon} from "@mui/material";
import {ReactComponent as LOGO} from '../logo.svg';

interface HomeProps {
    loading?: string;
}

const Home: React.FC<HomeProps> = ({loading = undefined}) => {


    const toPass = {
        sx: {
            height: 'auto!important',
            filter: `drop-shadow(0 2px 2px rgba(114, 134, 71, 0.6))`,
            fontSize: 100
        }
    };

    return (
        <Grid container direction={'column'} gap={4} justifyContent={'space-around'}
              sx={{textAlign: 'center', height: '100vh', maxWidth: 400, margin: '0 auto'}}>
            <Grid item>
                <SvgIcon viewBox="0 0 292 116" component={LOGO} {...toPass} inheritViewBox/>
            </Grid>
            <Grid item>
                {loading}
            </Grid>
            <Grid item>
                <CircularProgress/>
            </Grid>
        </Grid>
    );
};

export default Home;

import React from 'react';
import {SvgIcon} from '@mui/material';
import {ReactComponent as LOGO} from './logo.svg';
import {makeStyles} from '@mui/styles';
import {Theme} from '@mui/material/styles';

interface LogoProps {
    height?: number;
}

const useStyles = makeStyles<Theme>((theme) => ({
    logo: ({ height }: LogoProps) => ({
        fill: theme.palette.primary.main,
        height: 'auto!important',
        filter: `drop-shadow(0 1px 1px rgba(0, 0, 0, 0.6))`,
    })
}));

const Logo: React.FC<LogoProps> = (props) => {
    const classes = useStyles(props); // Pass height prop to useStyles
    const toPass = {};
    if (props.height && props.height > 0) {
        // @ts-ignore
        toPass.sx = { fontSize: props.height, height:'auto', filter: `drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3))` }
    }

    return (
        <SvgIcon viewBox="0 0 292 116" component={LOGO} className={classes.logo} {...toPass} inheritViewBox />
    );
};

export default Logo;



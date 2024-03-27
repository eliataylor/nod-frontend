import React, {useContext} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {AppBar, Badge, Box, Button, Grid} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DrawerMenu from "./DrawerMenu";
import {styled} from "@mui/material/styles";
import {QuantityContext} from "./CartProvider";
import Logo from "./Logo";

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, .2, 0, 1),
    justifyContent: 'space-between',
}));

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const location = useLocation();

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const price = useContext(QuantityContext).cartPrice

    return (
        <React.Fragment>
            <AppBar position="fixed" color={'transparent'}>
                <Grid container justifyContent={'space-between'} alignItems={'center'} padding={1} spacing={2}>
                    {location.pathname.length > 1 &&
                        <Grid item>
                            <Logo height={90} />
                        </Grid>
                    }
                    <Grid item style={{flexGrow: 1}}></Grid>
                    {price > 0 && <Grid item><Link
                        to={'/checkout'}>
                        <Badge color={'secondary'} max={999} badgeContent={price.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD'
                        })}><Button size={'small'} variant={'outlined'}>View
                            Cart</Button></Badge></Link>
                    </Grid>
                    }
                    <Grid item>
                        <IconButton
                            size={'large'}
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </AppBar>
            <Grid>
                <Box style={{width: '100%', margin: '100px auto 0 auto', padding: '1%', maxWidth: 1024}}>
                    {children}
                </Box>
            </Grid>
            <Drawer
                anchor="right"
                open={open}
            >
                <DrawerHeader>
                    <Logo height={40} />
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronRightIcon/>
                    </IconButton>
                </DrawerHeader>
                <DrawerMenu/>
            </Drawer>
        </React.Fragment>
    );
};

export default Layout;

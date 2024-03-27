import React, { useContext } from 'react';
import {useLocation} from 'react-router-dom';
import {AppBar, Box, Grid, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DrawerMenu from "./DrawerMenu";
import {styled, useTheme} from "@mui/material/styles";
import {CartProvider, QuantityContext} from "./CartProvider";

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-start',
}));

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const price = useContext(QuantityContext).totalQuantity

    return (
        <CartProvider>
            <AppBar position="fixed" color={'transparent'} elevation={0}>
                <Grid container justifyContent={'space-between'} padding={1}>
                    {location.pathname.length > 1 &&
                        <Grid item>
                            <img src={'/logo.png'} height={60}/>
                        </Grid>
                    }
                    <Grid item style={{flexGrow:1}}>
                        {price > 0 && <Typography variant={'body2'} >{price}</Typography>}
                    </Grid>
                    <Grid item>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerOpen}
                            sx={{...(open && {display: 'none'})}}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </AppBar>
            <Grid>
                <Box style={{width: '100%', margin: '80px auto 0 auto', padding:'1%', maxWidth: 1024}}>
                    {children}
                </Box>
            </Grid>
            <Drawer
                anchor="right"
                open={open}
            >
                <DrawerHeader>
                    <img src={'/logo.png'} height={30} />
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronRightIcon/>
                    </IconButton>
                </DrawerHeader>
                <DrawerMenu />
            </Drawer>
        </CartProvider>
    );
};

export default Layout;

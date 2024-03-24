import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import FoodMenu from './FoodMenu';
import Home from './Home';
import Faqs from './Faqs';
import Suppliers from './Suppliers';
import Contact from './Contact';
import {AppBar, Grid, SvgIcon, Box} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import DrawerMenu from "./DrawerMenu";
import {styled, useTheme} from "@mui/material/styles";

const drawerWidth = 240;

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

const App = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <BrowserRouter>
            <AppBar position="fixed" color={'transparent'} elevation={0}>
                <Toolbar color={'transparent'} >
                    <img src={'/logo.png'} height={60} />
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                        sx={{...(open && {display: 'none'})}}
                    >
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Grid>
                <DrawerHeader />
                <Box padding={2}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/next-week" element={<FoodMenu />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/suppliers" element={<Suppliers />} />
                        <Route path="/faq" element={<Faqs />} />
                        <Route path="*" element={<div>Page not found!</div>} />
                    </Routes>
                </Box>
            </Grid>
            <Drawer
                anchor="right"
                open={open}
            >
                <DrawerHeader>
                    <img src={'/logo.png'} height={30} />
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <DrawerMenu />
            </Drawer>
        </BrowserRouter>
    );
};

export default App;

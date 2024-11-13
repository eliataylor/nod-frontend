import React, {useContext, useMemo} from 'react';
import {useLocation} from 'react-router-dom';
import {AppBar, Box, Grid} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DrawerMenu from "../components/DrawerMenu";
import {styled} from "@mui/material/styles";
import {QuantityContext} from "../CartProvider";
import Logo from "./Logo";
import {useNavDrawer} from "../NavDrawerProvider";
import NavMenu from "../components/NavMenu";
import ViewCartButton from "../components/ViewCartButton";
import {ThemeContext} from "./ThemeContext";

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, .2, 0, 1),
    justifyContent: 'space-between',
}));

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const location = useLocation();
    const { navDrawerWidth, setNavDrawerWidth,  isMounted } = useNavDrawer();
    const { setDarkMode } = useContext(ThemeContext);
    const price = useContext(QuantityContext).cartPrice;

    const theme = useMemo(() => {
        if (location.pathname == '/' || location.pathname == '/menus' || location.pathname.indexOf('/partners') === 0 || location.pathname.indexOf('/terms') === 0 || location.pathname.indexOf('/contact') > -1 || location.pathname.indexOf('/terms') > -1 || location.pathname.indexOf('/faq') > -1) {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }, [location.pathname]);

    const handleDrawerOpen = () => {
        setNavDrawerWidth(300);
    };

    const handleDrawerClose = () => {
        setNavDrawerWidth(0);
    };


    const appBar = <AppBar position="fixed" color={'default'}>
        <Grid container justifyContent={'space-between'} alignItems={'center'} padding={1}
              spacing={2}>
            {location.pathname.length > 1 &&
                <Grid item style={{paddingTop:22, paddingLeft:22}} >
                    <Logo height={90}/>
                </Grid>
            }
            <Grid item style={{flexGrow: 1}}></Grid>
            {price > 0 && <Grid item><ViewCartButton /></Grid>
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

    return (
        <React.Fragment>
            <Grid container justifyContent={'space-around'} flexWrap={'nowrap'}>
                {isMounted === true &&
                    <Grid item sx={{ml:2, mt:3}} style={{maxWidth:240}}>
                        {(location.pathname.length > 1) &&
                            <Box sx={{pl:2}}>
                                <Logo height={100} />
                            </Box>
                        }
                        <NavMenu />
                    </Grid>
                }
                <Grid item flexGrow={1}>
                    {isMounted === false && appBar}
                    <Box style={{width: '100%', margin:`${isMounted ? 0 : '100px'} auto 0 auto`, padding: '1%', maxWidth: 1024}}>
                        {children}
                    </Box>
                </Grid>
            </Grid>


            <Drawer
                anchor="right"
                variant="temporary"
                open={!isMounted && navDrawerWidth > 0}
                ModalProps={{
                    keepMounted: isMounted
                }}
                onClose={handleDrawerClose}
                sx={{
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: navDrawerWidth },
                }}
            >
                <DrawerHeader>
                    <Logo height={80} />
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronRightIcon />
                    </IconButton>
                </DrawerHeader>
                <DrawerMenu />
            </Drawer>
        </React.Fragment>
    );
};

export default Layout;

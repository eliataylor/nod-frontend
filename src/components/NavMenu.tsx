import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {List, ListItem, ListItemText} from '@mui/material';

const NavMenu = () => {
    const location = useLocation();

    return (
            <List>
                <ListItem button component={Link} to="/" selected={location.pathname === '/'}>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/about" selected={location.pathname === '/about'}>
                    <ListItemText primary="About Us" />
                </ListItem>
                <ListItem button component={Link} to="/next-week" selected={location.pathname === '/next-week'}>
                    <ListItemText primary="Next Week" />
                </ListItem>
                {/* <ListItem button component={Link} to="/suppliers" selected={location.pathname === '/suppliers'}>
                <ListItemText primary="Suppliers" />
            </ListItem>
            <ListItem button component={Link} to="/faq" selected={location.pathname === '/faq'}>
                <ListItemText primary="FAQ" />
            </ListItem>
            <ListItem button component={Link} to="/testimonials" selected={location.pathname === '/testimonials'}>
                <ListItemText primary="Testimonials" />
            </ListItem>*/}
                <ListItem button component={Link} to="/contact" selected={location.pathname === '/contact'}>
                    <ListItemText primary="Contact" />
                </ListItem>

            </List>
    );
};

export default NavMenu;

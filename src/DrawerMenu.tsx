import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Divider, List, ListItem, ListItemIcon, ListItemText} from '@mui/material';

const DrawerMenu = () => {
    const location = useLocation();

    return (
        <List>
            <ListItem button component={Link} to="/" selected={location.pathname === '/'}>
                <ListItemIcon>
                    {/* Add icon for About Us */}
                </ListItemIcon>
                <ListItemText primary="About Us" />
            </ListItem>
            <ListItem button component={Link} to="/next-week" selected={location.pathname === '/menu'}>
                <ListItemIcon>
                    {/* Add icon for Next Week */}
                </ListItemIcon>
                <ListItemText primary="Next Week" />
            </ListItem>
            <ListItem button component={Link} to="/suppliers" selected={location.pathname === '/suppliers'}>
                <ListItemIcon>
                    {/* Add icon for Supplies */}
                </ListItemIcon>
                <ListItemText primary="Suppliers" />
            </ListItem>
            <ListItem button component={Link} to="/faq" selected={location.pathname === '/faq'}>
                <ListItemIcon>
                    {/* Add icon for FAQ */}
                </ListItemIcon>
                <ListItemText primary="FAQ" />
            </ListItem>
            <ListItem button component={Link} to="/contact" selected={location.pathname === '/contact'}>
                <ListItemIcon>
                    {/* Add icon for Contact */}
                </ListItemIcon>
                <ListItemText primary="Contact" />
            </ListItem>
            <Divider />
            {/* ... Your DrawerMenu component rendering for weekly DrawerMenu (if applicable) */}
        </List>
    );
};

export default DrawerMenu;

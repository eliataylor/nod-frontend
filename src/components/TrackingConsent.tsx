import React, {useState} from 'react';
import TrackingPermissions, {PermissionKeys} from "./TrackingPermissions";
import {AppBar, Fab, Toolbar} from "@mui/material";
import {Check} from "@mui/icons-material";

import {styled} from '@mui/material/styles';

const permissions:PermissionKeys = {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted'
};

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -35,
    left: 0,
    right: 0,
    margin: '0 auto',
});

const TrackingConsent: React.FC = () => {
    const [accepted, setAccepted] = useState(false);

    if (accepted === true) return null;

    return <AppBar position="fixed" color="default" sx={{ top: 'auto', bottom: 0, padding:3 }}>
        <Toolbar>
            <StyledFab color="secondary" aria-label="add" onClick={() => setAccepted(true)}>
                <Check />
            </StyledFab>
            <TrackingPermissions permissions={permissions}  />
        </Toolbar>
    </AppBar>;
};

export default TrackingConsent;

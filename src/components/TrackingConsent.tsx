import React, {useState} from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

const TrackingConsent: React.FC = () => {
    const [storageConsent, setStorageConsent] = useState<boolean>(false);
    const [trackingConsent, setTrackingConsent] = useState<boolean>(false);

    const handleStorageConsentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStorageConsent(event.target.checked);
    };

    const handleTrackingConsentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTrackingConsent(event.target.checked);
    };

    const handleAccept = () => {
        // Handle gtag calls for accepting storage and tracking permissions
        console.log('Storage consent:', storageConsent);
        console.log('Tracking consent:', trackingConsent);
    };

    const handleDeny = () => {
        // Handle gtag calls for denying storage and tracking permissions
        console.log('Storage consent denied');
        console.log('Tracking consent denied');
    };

    return (
        <div>
            <FormGroup>
                <FormControlLabel
                    control={<Switch checked={storageConsent} onChange={handleStorageConsentChange} />}
                    label="Storage consent"
                />
                <FormControlLabel
                    control={<Switch checked={trackingConsent} onChange={handleTrackingConsentChange} />}
                    label="Tracking consent"
                />
            </FormGroup>
            <Button variant="contained" color="primary" onClick={handleAccept}>
                Accept
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDeny}>
                Deny
            </Button>
        </div>
    );
};

export default TrackingConsent;

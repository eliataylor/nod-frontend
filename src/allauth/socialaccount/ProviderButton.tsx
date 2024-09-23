import {redirectToProvider} from '../lib/allauth'
import {SvgIcon, Button} from '@mui/material'
import React from "react";
import {ReactComponent as Google} from '../../assets/google.svg';
import {WifiPassword} from "@mui/icons-material";
import {AuthProcess} from "../lib/allauth";

interface ProviderButtonProps {
    provider: any;
    connected: boolean;
}

const ProviderButton: React.FC<ProviderButtonProps> = ({provider, connected}) => {

    function getIcon(provider: string) {
        if (provider === 'google') {
            return <Google/>
        }
        return null;
    }

    // @ts-ignore
    return (
        <Button
            startIcon={getIcon(provider.id)}
            endIcon={connected ? <WifiPassword/> : undefined}
            key={provider.id}
            fullWidth
            variant={'outlined'}
            color={'inherit'}
            onClick={() => redirectToProvider(provider.id, "/account/provider/callback",
                /* @ts-ignore */
                AuthProcess.CONNECT)}

        >{provider.name}
        </Button>
    )
}

export default ProviderButton;
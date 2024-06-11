import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import { Button} from "@mui/material";
import { styled } from '@mui/material/styles';
import Badge, { BadgeProps } from '@mui/material/Badge';
import {QuantityContext} from "../CartProvider";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    width:'100%',
    marginTop:15,
    marginBottom:15,
    '& .MuiBadge-badge': {
        left: '50%',
        top: 0,
        transform: 'translate(-50%, -50%)',
    },
}));

const ViewCartButton: React.FC<{}> = () => {

    const price = useContext(QuantityContext).cartPrice;

    return <Link to={'/checkout'} >
                <StyledBadge color={'secondary'} max={999}
                       anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                       badgeContent={price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                })}><Button variant={'outlined'} fullWidth={true} >View
                    Cart</Button></StyledBadge></Link>
};

export default ViewCartButton;

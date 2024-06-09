import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Badge, Button} from "@mui/material";
import {QuantityContext} from "../CartProvider";

const ViewCartButton: React.FC<{}> = () => {

    const price = useContext(QuantityContext).cartPrice;

    return <Link
                to={'/checkout'}>
                <Badge color={'secondary'} max={999} badgeContent={price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD'
                })}><Button size={'small'} variant={'outlined'}>View
                    Cart</Button></Badge></Link>
};

export default ViewCartButton;

import React from 'react';
import Fab from '@mui/material/Fab';

interface CartPriceProps {
    quantity: number;
}

const CartPrice: React.FC<CartPriceProps> = ({quantity}) => {

    return (
        <Fab color="primary" aria-label="add">
            {quantity}
        </Fab>
    );
};

export default CartPrice;

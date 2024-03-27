import React, {useContext} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {OrderItems, QuantityContext} from "./CartProvider";

interface Props {
    orderItems: OrderItems;
    label: React.ReactElement | string;
}

const OrderItemsCheckboxList: React.FC<Props> = ({orderItems, label}) => {

    const {updateCart} = useContext(QuantityContext)

    const missingItem = orderItems.findIndex(o => !o.servings || o.servings === 0);

    function handleToggle(event: React.ChangeEvent<HTMLInputElement>) {
        event.stopPropagation();
        orderItems.forEach(o => {
            const servings = o.servings ? o.servings : 1
            updateCart(o, servings)
        });
    }

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={missingItem === -1}
                    onChange={(e) => handleToggle(e)}
                />
            }
            label={label || 'Select All'}
        />
    );
};

export default OrderItemsCheckboxList;

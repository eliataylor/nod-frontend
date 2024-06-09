import React, {useContext} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {OrderItems, QuantityContext} from "../CartProvider";

interface Props {
    orderItems: OrderItems;
    label?: React.ReactElement | string
}

const OrderItemsCheckboxList: React.FC<Props> = ({orderItems, label}) => {

    const {updateCart} = useContext(QuantityContext);

    const missingItem = orderItems.findIndex(o => !o.servings || o.servings === 0);

    function handleToggle(event: React.ChangeEvent<HTMLInputElement>) {
        // event.stopPropagation();
        orderItems.forEach((o) => {
            let servings = 1;
            if (!event.target.checked) {
                servings = 0;
            } else if (o.servings && o.servings > 1) {
                servings = o.servings;
            }
            // console.log('update ' + servings, o);
            updateCart(o, servings)
        });
    }

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={missingItem === -1}
                    value={missingItem}
                    onChange={(e) => handleToggle(e)}
                />
            }
            label={label || undefined}
        />
    );
};

export default OrderItemsCheckboxList;

import React, {useContext} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {CartItems, QuantityContext} from "../CartProvider";

interface Props {
    cartItems: CartItems;
    label?: React.ReactElement | string
}

const CartItemsCheckboxList: React.FC<Props> = ({cartItems, label}) => {

    const {updateCart} = useContext(QuantityContext);

    const missingItem = cartItems.findIndex(o => !o.servings || o.servings === 0);

    function handleToggle(event: React.ChangeEvent<HTMLInputElement>) {
        // event.stopPropagation();
        cartItems.forEach((o) => {
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

export default CartItemsCheckboxList;

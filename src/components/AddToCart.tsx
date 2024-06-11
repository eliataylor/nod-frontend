import React, {useContext} from 'react';
import {QuantityContext} from '../CartProvider';
import {MealProps} from "./MealQuantity";
import {Button} from "@mui/material";

const AddToCart: React.FC<MealProps> = ({meal}) => {
    const {updateCart} = useContext(QuantityContext);

    const handleChange = () => {
        updateCart(meal, 1);
    };

    return <Button
        aria-label="Servings"
        size={'small'} variant={'contained'}
        color={'primary'}
        sx={{borderRadius:10, width:150, textAlign:'center'}}
        id={`addtocart-${meal.id}`}
        onClick={handleChange}
    >Add To Order</Button>
};

export default AddToCart;

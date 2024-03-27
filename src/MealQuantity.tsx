import React, {useContext} from 'react';
import {Day, Meal, QuantityContext} from './CartProvider';
import TextField from '@mui/material/TextField';

interface MealProps {
    meal: Meal;
    day: Day
}

const MealQuantity: React.FC<MealProps> = ({meal}) => {
    const {updateCart} = useContext(QuantityContext);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(event.target.value, 10) || 0;
        updateCart(meal, newQuantity);
    };

    return (
        <TextField
            style={{maxWidth: 60}}
            id={`quantity-${meal.id}`}
            type="number"
            value={meal.servings}
            onChange={handleChange}
            label="Servings"
            variant="standard"
            size="small"
        />
    );
};

export default MealQuantity;
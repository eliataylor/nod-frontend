import React, { useContext, useState } from 'react';
import { QuantityContext } from './CartProvider';
import TextField from '@mui/material/TextField';

interface MealProps {
    meal: {
        id: number;
        title: string;
        description: string;
        photos: object
    };
}

const MealQuantity: React.FC<MealProps> = ({ meal }) => {
    const { totalQuantity, updateQuantity } = useContext(QuantityContext);
    const [quantity, setQuantity] = useState(0);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(event.target.value, 10) || 0;
        setQuantity(newQuantity);
        updateQuantity(meal.id, newQuantity - quantity);
    };

    return (
            <TextField
                style={{maxWidth:50}}
                id={`quantity-${meal.id}`}
                type="number"
                value={quantity}
                onChange={handleChange}
                label="Servings"
                variant="standard"
                size="small"
            />
    );
};

export default MealQuantity;

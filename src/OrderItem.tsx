import React, {useContext} from 'react';
import {Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import MealQuantity from "./MealQuantity";
import {Day, Meal, QuantityContext} from "./CartProvider";


interface Props {
    meal: Meal;
    day: Day;
}

const OrderItem: React.FC<Props> = ({meal, day}) => {

    const {cartItems} = useContext(QuantityContext)

    const inCart = cartItems.find(c => c.id === meal.id)
    const topass = inCart || meal;

    return (
        <Card variant="outlined" key={`${meal.id}-${meal.bld}`}>
            {meal.photos && meal.photos.length > 0 &&
                <CardMedia image={meal.photos[0]} sx={{height: 140}}/>
            }
            <CardContent>
                <Grid container justifyContent={'space-between'}>
                    <Grid item>
                        <Typography variant="overline" gutterBottom>{meal.bld}</Typography>
                        <Typography variant="subtitle1">
                            {meal.title}
                        </Typography>
                        <Typography variant="body2" component="div">
                            {meal.description}
                        </Typography>
                        {/* <Typography variant="body2" color="primary" component={Link} to={`/receipt/${meal.id}`}>View Details</Typography> */}
                    </Grid>
                    <Grid item>
                        <MealQuantity meal={topass} day={day} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default OrderItem;

import React, {useContext} from 'react';
import {Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import MealQuantity from "./MealQuantity";
import {Meal, QuantityContext} from "./CartProvider";
import {useTheme} from "@mui/styles";
import {Theme} from '@mui/material/styles';

interface Props {
    meal: Meal;
}

const OrderItem: React.FC<Props> = ({meal}) => {
    const theme = useTheme() as Theme;

    const {cartItems} = useContext(QuantityContext)

    const inCart = cartItems.find(c => c.id === meal.id)
    const topass = inCart || meal;

    return (
        <Card key={`${meal.id}-${meal.bld}`} style={{marginBottom:10, borderRadius:"4px 0 0 0"}}>
            {meal.photos && meal.photos.length > 0 &&
                <CardMedia image={meal.photos[0]} sx={{height: 250, maxWidth:300}}/>
            }
            <CardContent>
                <Grid container justifyContent={'space-between'}>
                    <Grid item>
                        <Typography variant="subtitle1" color={'primary'}>
                            {meal.title}
                        </Typography>
                        <Typography variant="body1" component="div">
                            {meal.description}
                        </Typography>
                        {/* <Typography variant="body2" color="primary" component={Link} to={`/receipt/${meal.id}`}>View Details</Typography> */}
                    </Grid>
                    <Grid item>
                        <Typography variant="caption" color={theme.palette.grey[600]} >{meal.bld.toUpperCase()}</Typography>
                        <div><MealQuantity meal={topass} /></div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default OrderItem;

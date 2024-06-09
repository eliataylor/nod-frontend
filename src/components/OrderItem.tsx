import React, {useContext} from 'react';
import {Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import MealQuantity from "./MealQuantity";
import {Meal, QuantityContext} from "../CartProvider";
import {useTheme} from "@mui/styles";
import {Theme} from '@mui/material/styles';

interface Props {
    meal: Meal;
    showServings: boolean;
    hideIfMissing?: string;
}

const OrderItem: React.FC<Props> = ({meal, showServings, hideIfMissing=""}) => {
    const theme = useTheme() as Theme;

    const {cartItems} = useContext(QuantityContext)

    const inCart = cartItems.find(c => c.id === meal.id)
    const topass = inCart || meal;

    if (hideIfMissing && hideIfMissing.length > 0) {
        let has = false;
        if (meal.title.includes(hideIfMissing)) {
            has = true;
        }
        if (meal.description.includes(hideIfMissing)) {
            has = true;
        }
        if (has === false) return null;
    }

    return (
        <Card key={`${meal.id}-${meal.bld}`} style={{marginBottom:10, borderRadius:"4px 0 0 0"}}>
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
                        {!showServings &&
                            <Typography variant="caption"
                                        color={theme.palette.grey[600]}>{meal.bld.toUpperCase()}</Typography>
                        }
                    </Grid>
                    {showServings &&
                        <Grid item>
                            <Typography variant="caption"
                                        color={theme.palette.grey[600]}>{meal.bld.toUpperCase()}</Typography>
                            <div><MealQuantity meal={topass}/></div>
                        </Grid>
                    }
                    {meal.photos && meal.photos.length > 0 &&
                        <Grid item xs={12} md={4}><CardMedia image={meal.photos[0]} sx={{height: 150, maxWidth:300}}/></Grid>
                    }
                </Grid>
            </CardContent>
        </Card>
    );
};

export default OrderItem;

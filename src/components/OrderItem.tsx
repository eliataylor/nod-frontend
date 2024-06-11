import React, {useContext} from 'react';
import {Card, CardContent, CardMedia, CardActionArea, Box, Grid, Typography} from '@mui/material';
import MealQuantity from "./MealQuantity";
import {Meal, QuantityContext} from "../CartProvider";
import {useTheme} from "@mui/styles";
import {Theme} from '@mui/material/styles';
import AddToCart from "./AddToCart";

interface Props {
    meal: Meal;
    show_servings: boolean;
    show_bld: boolean;
    show_price: boolean;
    show_date: boolean;
    hideIfMissing?: string;
}
type MyComponentDefaultProps = Partial<Props>;

const MyOrderItemComponent: React.FC<MyComponentDefaultProps> = ({meal, show_servings=false, show_price=false, show_date=false, show_bld=false, hideIfMissing=""}) => {
    const theme = useTheme() as Theme;

    const {cartItems} = useContext(QuantityContext)

    if (!meal) return null; // why does TypeScript still think meal can be undefined?

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
        <Box key={`${meal.id}-${meal.bld}`} sx={{position:'relative'}}>
            <Card sx={{marginBottom:5, borderRadius:"4px 0 0 0"}}>
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
                            {show_bld &&
                                <Typography variant="caption"
                                            color={theme.palette.grey[600]}>{meal.bld.toUpperCase()}</Typography>
                            }
                            {show_price &&
                                <Typography variant="caption"
                                            color={theme.palette.grey[600]}>{meal.price}</Typography>
                            }
                            {show_date &&
                                <Typography variant="caption"
                                            color={theme.palette.grey[600]}>{meal.date}</Typography>
                            }
                        </Grid>
                        {show_servings &&
                            <Grid item>
                                {typeof meal.servings === 'number' &&
                                    <MealQuantity meal={topass}/>
                                }
                            </Grid>
                        }
                        {meal.photos && meal.photos.length > 0 &&
                            <Grid item xs={12} md={4}><CardMedia image={meal.photos[0]} sx={{height: 150, maxWidth:300}}/></Grid>
                        }
                    </Grid>

                </CardContent>
            </Card>
            {!meal.servings && <Box sx={{position:'absolute', bottom:-30, transform: 'translate(-50%, -50%)', left:'50%'}}><AddToCart meal={topass}/></Box> }
        </Box>
    );
};

MyOrderItemComponent.defaultProps = {
    show_servings: false,
    show_bld: false,
    show_price: false,
    show_date: false,
    hideIfMissing: ''
}

type MyComponentRequiredProps = Required<Props>;

const MyComponentWrapper: React.FC<MyComponentRequiredProps> = (props) => {
    return <MyOrderItemComponent {...props} />;
};

export default MyComponentWrapper;

// export default MyOrderItemComponent;

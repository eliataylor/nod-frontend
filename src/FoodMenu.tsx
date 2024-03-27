import React, {useContext, useEffect} from 'react';
import {Card, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import Box from '@mui/material/Box';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MealQuantity from "./MealQuantity";
import {Day, Meal, OrderItems, QuantityContext} from "./CartProvider";
import AddItemsCheckbox from "./AddItemsCheckbox";
import OrderItem from "./OrderItem";

const FoodMenu: React.FC = () => {
    const {updateFoodMenu, weeklyMenu} = useContext(QuantityContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/menu.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch menu data');
                }
                const data = await response.json();
                updateFoodMenu(data);
            } catch (error) {
                console.error('Error fetching menu data:', error);
                // Handle error gracefully, e.g., display an error message
            }
        };

        fetchData();
    }, []);

    if (!weeklyMenu || weeklyMenu.length === 0) return <div>loading menu...</div>

    function flattenMeals(obj: any, flatList: OrderItems): OrderItems {
        if (Array.isArray(obj)) {
            for (const item of obj) {
                flatList = flattenMeals(item, flatList);
            }
        } else if (typeof obj === 'object' && obj !== null) {
            if ('meals' in obj) {
                flatList = flatList.concat(obj.meals);
            }
            for (const key in obj) {
                flatList = flattenMeals(obj[key], flatList);
            }
        }
        return flatList;
    }

    return (
        <div>

            {weeklyMenu.map((week, index) => (
                <Accordion key={index} style={{marginBottom: 20, width: '100%'}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls={`week-${index}-content`}
                        id={`week-${index}-header`}
                    >
                        <AddItemsCheckbox
                            label={<Typography>{week.week_name}</Typography>}
                            orderItems={flattenMeals(week, [])} />

                    </AccordionSummary>
                    <AccordionDetails>
                        {week.days.map((day, dayIndex) => (
                            <Box key={dayIndex} margin={"0 0 20px 0"}>
                                <Grid container justifyContent={'space-between'}>
                                    <Grid item>
                                        <AddItemsCheckbox orderItems={flattenMeals(day, [])}
                                                          label={<Typography variant="h6" >{day.day}</Typography>}
                                        />

                                    </Grid>
                                    <Grid item style={{textAlign: 'right', fontSize: 11}}>
                                        <div>Delivers</div>
                                        <div>{day.delivered}</div>
                                    </Grid>
                                </Grid>
                                <div>
                                    {day.meals.map(meal => <OrderItem meal={meal} day={day} />)}
                                </div>
                            </Box>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default FoodMenu;

import React, {useContext, useEffect} from 'react';
import {QuantityContext} from "./CartProvider";
import WeekMenu from "./WeekMenu";
import {Box, Divider, Typography} from "@mui/material";

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
                data.forEach((week:any) => {
                   week.days.forEach((day:any) => {
                        day.meals.forEach((meal:any) => {
                            meal.date = day.date
                        })
                   })
                });
                updateFoodMenu(data);
            } catch (error) {
                console.error('Error fetching menu data:', error);
                window.alert('Error loading Menu')
            }
        };

        fetchData();
    }, []);

    if (!weeklyMenu || weeklyMenu.length === 0) return <div>loading menu...</div>

    return (
        <div>
            <Box mb={1}>
            <Typography variant={'h6'}>CREATE YOUR MEAL PROGRAM</Typography>
            <Typography variant={'body2'}>5% off for 3 or more servings on any meal</Typography>
            <Typography variant={'body2'}>10% for whole week subscriptions</Typography>
            <Typography variant={'body2'}>Free addon with three or more days (select at checkout)</Typography>
            </Box>
            <Divider />
            {weeklyMenu.map((week, index) => (
                <WeekMenu key={`week-${week.week_name}`} week={week} index={index} />
            ))}
        </div>
    );
};

export default FoodMenu;

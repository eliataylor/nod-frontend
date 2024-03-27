import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardMedia, Typography, Grid} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import Box from '@mui/material/Box';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MealQuantity from "./MealQuantity";

interface Meal {
    id: number;
    title: string;
    bld: string;
    description: string;
    photos: string[]; // Assuming photo URLs will be stored as strings
}

interface Day {
    day: string;
    date: string;
    delivered: string;
    meals: Meal[];
}

interface Week {
    week: string;
    date: string;
    days: Day[];
}

interface MenuData {
    menuData: Week[];
}

const weekdays = ['Mon', 'Tues', 'Weds', 'Thurs', 'Fri'];

const FoodMenu: React.FC = () => {
    const [menuData, setMenuData] = useState<Week[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/menu.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch menu data');
                }
                const data = await response.json();
                setMenuData(data);
            } catch (error) {
                console.error('Error fetching menu data:', error);
                // Handle error gracefully, e.g., display an error message
            }
        };

        fetchData();
    }, []);

    if (!menuData || menuData.length === 0) return <div>loading menu...</div>

    const renderMeal = (meal: Meal) => {
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
                                <MealQuantity meal={meal}/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            );
    };

    return (
        <div>
            {menuData.map((week, index) => (
                <Accordion key={index} style={{marginBottom: 20, width: '100%'}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls={`week-${index}-content`}
                        id={`week-${index}-header`}
                    >
                        <Typography>{week.week}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {week.days.map((day, dayIndex) => (
                            <Box key={dayIndex} margin={"0 0 20px 0"}>
                                <Grid container justifyContent={'space-between'}>
                                    <Grid item>
                                        <Typography variant="h6" style={{marginBottom:0}}>{day.day}</Typography>
                                    </Grid>
                                    <Grid item  style={{textAlign:'right', fontSize:11}}>
                                            <div>Delivered</div>
                                            <div>{day.delivered}</div>
                                    </Grid>
                                </Grid>
                                <div>
                                    {day.meals.map(meal => renderMeal(meal))}
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

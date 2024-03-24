import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import Box from '@mui/material/Box';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Link} from 'react-router-dom';

interface Meal {
    id: number;
    title: string;
    description: string;
    photos: string[]; // Assuming photo URLs will be stored as strings
}

interface Day {
    day: string;
    lunch: Meal;
    dinner: Meal;
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

    const renderMeal = (meal:Meal, mealType:String) => {
        if (meal) {
            return (
                <Card variant="outlined" key={`${meal.id}-${mealType}`}>
                    {meal.photos && meal.photos.length > 0 &&
                        <CardMedia image={meal.photos[0]} sx={{ height: 140 }} />
                    }
                    <CardContent>
                        <Typography variant="overline" gutterBottom>{mealType}</Typography>
                        <Typography variant="subtitle1" >
                            {meal.title}
                        </Typography>
                        <Typography variant="body2" component="div">
                            {meal.description}
                        </Typography>
                        <Typography variant="body2" color="primary" component={Link} to={`/receipt/${meal.id}`}>View Details</Typography>
                    </CardContent>
                </Card>
            );
        } else {
            return null;
        }
    };

    return (
        <div>
            {menuData.map((week, index) => (
                <Accordion key={index} style={{marginBottom:20}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`week-${index}-content`}
                        id={`week-${index}-header`}
                    >
                        <Typography>{week.week}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                            {week.days.map((day, dayIndex) => (
                                <Box key={dayIndex} margin={"0 0 20px 0"}>
                                    <Typography variant="h6">{day.day}</Typography>
                                    <div>
                                        {renderMeal(day.lunch, 'Lunch')}
                                        {renderMeal(day.dinner, 'Dinner')}
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

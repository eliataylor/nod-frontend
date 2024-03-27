import React, {useContext, useState} from 'react';
import {Grid, Typography} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import Box from '@mui/material/Box';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {OrderItems, QuantityContext, Week, Meal} from "./CartProvider";
import AddItemsCheckbox from "./AddItemsCheckbox";
import OrderItem from "./OrderItem";


interface Props {
    week: Week;
    index: number
}

const WeekMenu: React.FC<Props> = ({week, index}) => {

    const [isOpen, setIsOpen] = useState(true);
    const {cartItems} = useContext(QuantityContext)

    const handleAccordionChange = () => {
        setIsOpen((prev) => !prev);
    };

    function flattenMeals(obj: any, flatList: OrderItems): OrderItems {
        if (Array.isArray(obj)) {
            for (const item of obj) {
                flatList = flattenMeals(item, flatList);
            }
        } else if (typeof obj === 'object' && obj !== null) {
            if ('meals' in obj) {
                obj.meals.forEach((meal:Meal) => {
                    const inCart = cartItems.find(c => c.id === meal.id)
                    const topass = inCart || meal;
                    flatList.push(topass);
                });
            }
            for (const key in obj) {
                flatList = flattenMeals(obj[key], flatList);
            }
        }
        return flatList;
    }

    return (
        <Accordion key={`weekmenu-${index}`} style={{marginBottom: 20, width: '100%'}}
                   onChange={handleAccordionChange}
                   expanded={isOpen} >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`week-${index}-content`}
                id={`week-${index}-header`}
            >
                <AddItemsCheckbox
                    key={`checkallweek-${week.week_name}`}
                    label={<Typography>{week.week_name}</Typography>}
                    orderItems={flattenMeals(week, [])}/>

            </AccordionSummary>
            <AccordionDetails>
                {week.days.map((day, dayIndex) => (
                    <Box key={`week-${week.week_name}-day-${day.date}`}  margin={"0 0 20px 0"}>
                        <Grid container justifyContent={'space-between'}>
                            <Grid item>
                                <AddItemsCheckbox
                                    key={`checkallday-${day.date}`}
                                    orderItems={flattenMeals(day, [])}
                                    label={<Typography variant="h6">{day.day}</Typography>}
                                />

                            </Grid>
                            <Grid item style={{textAlign: 'right', fontSize: 11}}>
                                <div>Delivers</div>
                                <div>{day.delivered}</div>
                            </Grid>
                        </Grid>
                        <div>
                            {day.meals.map(meal => <OrderItem key={`meal-${meal.id}`} meal={meal} day={day}/>)}
                        </div>
                    </Box>
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

export default WeekMenu;

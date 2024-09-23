import React, {useContext, useState} from 'react';
import {Typography} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import Box from '@mui/material/Box';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Meal, CartItems, QuantityContext, Week} from "../CartProvider";
import AddItemsCheckbox from "../components/AddItemsCheckbox";
import OrderItem from "../components/OrderItem";
import {makeStyles, useTheme} from '@mui/styles';
import {lighten, Theme} from '@mui/material/styles';
import {nearestDay} from "../Utils";
import {useNavDrawer} from "../NavDrawerProvider";

const useStyles = makeStyles((theme: Theme) => ({
    summary: {
        backgroundColor: `linear-gradient(-45deg, ${lighten(theme.palette.primary.main, .9)} 10%, ${lighten(theme.palette.primary.main, 1)} 40%, ${lighten(theme.palette.primary.main, 1)} 60%, ${lighten(theme.palette.primary.main, .9)} 90%)`
    },
}));

interface Props {
    week: Week;
    index: number
}

const WeekMenu: React.FC<Props> = ({week, index}) => {
    const theme = useTheme();
    // @ts-ignore
    const classes = useStyles(theme);

    const [isOpen, setIsOpen] = useState(true);
    const {cartItems} = useContext(QuantityContext)
    const { keyword } = useNavDrawer();

    const handleAccordionChange = (e:any) => {
        if (e.target.nodeName && e.target.nodeName.toLowerCase() === 'input') {
            return false;
        }

        setIsOpen((prev) => !prev);
    };

    function flattenMeals(obj: any, flatList: CartItems): CartItems {
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

    const monday = new Date(week.date);

    return (
        <Accordion key={`weekmenu-${index}`} style={{marginBottom: 20, width: '100%'}}
                   onChange={handleAccordionChange}
                   expanded={isOpen} >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`week-${index}-content`}
                id={`week-${index}-header`}
                className={classes.summary}
            >

                <AddItemsCheckbox
                    key={`checkallweek-${week.week_name}`}
                    cartItems={flattenMeals(week, [])}/>

                <div>
                    <Typography variant="h6" color={'secondary'} >{week.week_name}</Typography>
                    <Typography variant="caption" >Delivers {nearestDay(monday, 7)} and {nearestDay(monday, 3)}</Typography>
                </div>

            </AccordionSummary>
            <AccordionDetails>
                {week.days.map((day, dayIndex) => (
                    <Box key={`week-${week.week_name}-day-${day.date}`}  margin={"0 0 20px 0"}>
                        <AddItemsCheckbox
                            key={`checkallday-${day.date}`}
                            cartItems={flattenMeals(day, [])}
                            label={<Typography variant="h6" >{day.day}</Typography>}
                        />
                        <div>
                            {day.meals.map(meal => <OrderItem hideIfMissing={keyword}  key={`meal-${meal.id}`} meal={meal}  show_bld={true} show_date={false}  show_servings={true} show_price={false} />)}
                        </div>
                    </Box>
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

export default WeekMenu;

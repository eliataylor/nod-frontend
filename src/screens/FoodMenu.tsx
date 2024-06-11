import React, {useContext, useEffect} from 'react';
import {QuantityContext} from "../CartProvider";
import WeekMenu from "./WeekMenu";
import {useNavDrawer} from "../NavDrawerProvider";
import MenuByMeal from "./MenuByMeal";

import {useLocation} from "react-router-dom";

const FoodMenu: React.FC = () => {
    const {updateFoodMenu, weeklyMenu} = useContext(QuantityContext)
    const {isMounted} = useNavDrawer();
    const location = useLocation()

    const price = useContext(QuantityContext).cartPrice;

    const fetchData = async () => {
        const menuName = location.pathname.indexOf('postpartum') > -1 ? 'postpartum' : 'next-week';
        try {
            const response = await fetch(`/api/${menuName}.json`);
            if (!response.ok) {
                throw new Error('Failed to fetch menu data');
            }
            const data = await response.json();
            data.forEach((week: any) => {
                week.days.forEach((day: any) => {
                    day.meals.forEach((meal: any) => {
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

    useEffect(() => {
        fetchData();
    }, [location.pathname]);

    if (!weeklyMenu || weeklyMenu.length === 0) return <div>Loading menu...</div>

    if (location.pathname.indexOf('/servings') > -1) return <MenuByMeal/>

    return <React.Fragment>
        {weeklyMenu.map((week, index) => (
                <WeekMenu key={`week-${week.week_name}`} week={week} index={index}/>
            ))}
    </React.Fragment>

}


export default FoodMenu;

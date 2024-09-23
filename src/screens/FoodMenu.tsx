import React, {useContext, useEffect} from 'react';
import {QuantityContext, Week} from "../CartProvider";
import MenuByMeal from "./MenuByMeal";

import {useLocation} from "react-router-dom";
import WeekMenu from "./WeekMenu";

const FoodMenu: React.FC = () => {
    const {updateFoodMenu, weeklyMenu} = useContext(QuantityContext)
    const location = useLocation()

    const fetchData = async () => {
        const menuName = location.pathname.indexOf('postpartum') > -1 ? 'postpartum' : 'next-week';
        try {
            const response = await fetch(`/api/${menuName}.json`);
            if (!response.ok) {
                throw new Error('Failed to fetch menu data');
            }
            const data = await response.json();
            data.forEach((week: any) => {
                if (week.days) {
                    week.days.forEach((day: any) => {
                        day.meals.forEach((meal: any) => {
                            meal.date = day.date
                        })
                    })
                }
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

    // @ts-ignore
    if (location.pathname.indexOf('/servings') > -1 || typeof weeklyMenu[0]['days'] === 'undefined') return <MenuByMeal/>

    return <React.Fragment>
        {(weeklyMenu as Week[]).map((week, index) => {
            return <WeekMenu key={`week-${week?.week_name}`} week={week} index={index}/>
        })}
    </React.Fragment>

}


export default FoodMenu;

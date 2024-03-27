import React, {useContext, useEffect} from 'react';
import {QuantityContext} from "./CartProvider";
import WeekMenu from "./WeekMenu";

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

    return (
        <div>
            {weeklyMenu.map((week, index) => (
                <WeekMenu key={`week-${week.week_name}`} week={week} index={index} />
            ))}
        </div>
    );
};

export default FoodMenu;

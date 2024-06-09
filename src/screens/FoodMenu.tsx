import React, {useContext, useEffect} from 'react';
import {QuantityContext} from "../CartProvider";
import WeekMenu from "./WeekMenu";
import {Divider, Grid} from "@mui/material";
import {useNavDrawer} from "../NavDrawerProvider";
import SearchField from "../components/SearchField";
import ActivePromotions from "../components/ActivePromotions";
import ViewCartButton from "../components/ViewCartButton";

const FoodMenu: React.FC = () => {
    const {updateFoodMenu, weeklyMenu} = useContext(QuantityContext)
    const {isMounted} = useNavDrawer();

    const price = useContext(QuantityContext).cartPrice;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/menu.json');
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

        fetchData();
    }, []);

    if (!weeklyMenu || weeklyMenu.length === 0) return <div>loading menu...</div>


    return (
        <div>
            <ActivePromotions/>
            <Divider sx={{marginBottom: 2}}/>
            <Grid container>
                {isMounted === true && price > 0 && <Grid item xs={12} sx={{m: 2, textAlign:'right'}}><ViewCartButton /></Grid>}
                <Grid item xs={12} sx={{mb:2}}>
                    <SearchField/>
                </Grid>
                <Grid item xs={12}>
                    {weeklyMenu.map((week, index) => (
                        <WeekMenu key={`week-${week.week_name}`} week={week} index={index}/>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
};

export default FoodMenu;

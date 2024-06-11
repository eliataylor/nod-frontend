import React, {useContext} from 'react';
import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import {Meal, OrderItems, QuantityContext} from "../CartProvider";
import OrderItem from "../components/OrderItem";
import {useNavDrawer} from "../NavDrawerProvider";

const MenuByMeal: React.FC = () => {

    const { weeklyMenu, cartItems, program } = useContext(QuantityContext)
    const { keyword } = useNavDrawer();

    function flattenMealTypes(obj: any, mealType:string, flatList: OrderItems): OrderItems {
        if (Array.isArray(obj)) {
            for (const item of obj) {
                flatList = flattenMealTypes(item, mealType, flatList);
            }
        } else if (typeof obj === 'object' && obj !== null) {
            if ('meals' in obj) {
                obj.meals.forEach((meal:Meal) => {
                    if (meal.bld === mealType) {
                        const inCart = cartItems.find(c => c.id === meal.id)
                        const topass = inCart || meal;
                        flatList.push(topass);
                    }
                });
            }
            for (const key in obj) {
                flatList = flattenMealTypes(obj[key],mealType, flatList);
            }
        }
        return flatList;
    }

    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack', 'desert', 'beverage'];

    return (
        <Box>
            <div>
                <Typography variant="h6" color={'secondary'} >CHOOSE YOUR MEALS</Typography>
                <Typography variant="caption" >Now it’s time to select the meals for your {program.program_name} </Typography>
            </div>

            <Box>
                {mealTypes.map((mealType, mealIndex) => {
                  const meals = flattenMealTypes(weeklyMenu, mealType, []);
                  if (meals.length === 0) return null;
                  return <Box key={`mealType-${mealType}`}  margin={"0 0 20px 0"}>
                      <Typography variant="h6" color={'secondary'} sx={{textTransform:'capitalize'}} >{mealType}</Typography>
                      <div>
                          {meals.map(meal => <OrderItem hideIfMissing={keyword}
                                                        key={`meal-${meal.id}`} meal={meal} show_bld={false} show_servings={true}
                                                        show_price={false} show_date={false} />)}
                      </div>
                  </Box>
                })}
            </Box>
        </Box>
    );
};

export default MenuByMeal;

import React, { createContext, useState } from 'react';

export interface Meal {
    id: number;
    title: string;
    bld: string;
    description: string;
    price: number;
    photos: string[]; // Assuming photo URLs will be stored as strings
    servings: number | undefined; // only a CLIENT SIDE quantity of this meal in my cart
}

export interface Day {
    day: string;
    date: string;
    delivered: string;
    meals: Meal[];
}

export interface Week {
    week_name: string;
    date: string;
    days: Day[]
}

export type MenuData = Week[] | null;
export type OrderItems = Meal[];

interface QuantityContextProps {
    cartPrice: number;
    updateCart: (meal: Meal, quantity: number) => void;
    updateFoodMenu: (menu:MenuData) => void;
    weeklyMenu: MenuData;
}

const QuantityContext = createContext<QuantityContextProps>({
    cartPrice: 0,
    updateCart: (meal, quantity) => {},
    weeklyMenu: null,
    updateFoodMenu: (menu:MenuData) => []
});

interface CartProviderProps {
    children: React.ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartPrice, setPrice] = useState<number>(0);
    const [cartItems, setCartItems] = useState<Meal[]>([]);
    const [weeklyMenu, updateFoodMenu] = useState<MenuData>(null);

    const updateCart = (meal: Meal, servings: number) => {
        const index = cartItems.findIndex((c:Meal) => c.id === meal.id)
        const newItems: Meal[] = [...cartItems];
        if (index > -1) {
            if (servings === 0) {
                newItems.splice(index, 1);
            } else {
                newItems[index].servings = servings;
            }
        } else {
            newItems.push({...meal,servings:servings})
        }
        setCartItems(newItems);
        const newprice = cartItems.reduce((accumulator:number, currentValue:Meal) => {
            accumulator += currentValue.price * (currentValue.servings ? currentValue.servings : 1);
            return accumulator;
        }, 0)
        setPrice(newprice);
    };

    return (
        <QuantityContext.Provider value={{ cartPrice, updateCart, weeklyMenu, updateFoodMenu }}>
            {children}
        </QuantityContext.Provider>
    );
};

export { QuantityContext, CartProvider };

import React, {createContext, useState} from 'react';

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
    cartItems: OrderItems;
}

const QuantityContext = createContext<QuantityContextProps>({
    cartPrice: 0,
    updateCart: (meal, quantity) => {},
    weeklyMenu: null,
    updateFoodMenu: (menu:MenuData) => [],
    cartItems: []
});

interface CartProviderProps {
    children: React.ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartPrice, setPrice] = useState<number>(0);
    const [cartItems, setCartItems] = useState<Meal[]>([]);
    const [weeklyMenu, updateFoodMenu] = useState<MenuData>(null);

    const updateCart = async (meal: Meal, servings: number) => {
        setCartItems((prevCartItems) => {
            const index = prevCartItems.findIndex((c: Meal) => c.id === meal.id);
            const newItems: Meal[] = [...prevCartItems];
            if (index > -1) {
                if (servings === 0) {
                    newItems.splice(index, 1);
                } else {
                    newItems[index].servings = servings;
                }
            } else {
                newItems.push({ ...meal, servings: servings });
            }
            const newPrice = newItems.reduce((accumulator: number, currentValue: Meal) => {
                const servings = (currentValue.servings ? currentValue.servings : 1)
                if (servings > 2) {
                    accumulator += (currentValue.price * servings) * .95
                } else {
                    accumulator += currentValue.price * servings;
                }

                return accumulator;
            }, 0);
            setPrice(parseFloat(newPrice.toFixed(2)));
            return newItems;
        });
    };

    return (
        <QuantityContext.Provider value={{ cartPrice, cartItems, updateCart, weeklyMenu, updateFoodMenu }}>
            {children}
        </QuantityContext.Provider>
    );
};

export { QuantityContext, CartProvider };

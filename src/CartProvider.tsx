import React, {createContext, useEffect, useState} from 'react';

export interface Meal {
    id: number;
    title: string;
    bld: string;
    description: string;
    price: number;
    photos: string[]; // Assuming photo URLs will be stored as strings
    servings?: number; // only a CLIENT SIDE quantity of this meal in my cart
    date?: string;
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
    updateFoodMenu: (menu: MenuData) => void;
    weeklyMenu: MenuData;
    cartItems: OrderItems;
}

const QuantityContext = createContext<QuantityContextProps>({
    cartPrice: 0,
    updateCart: (meal, quantity) => {
    },
    weeklyMenu: null,
    updateFoodMenu: (menu: MenuData) => [],
    cartItems: []
});

interface CartProviderProps {
    children: React.ReactNode;
    initialState?: QuantityContextProps
}

const CartProvider: React.FC<CartProviderProps> = ({children, initialState}) => {
    const [cartPrice, setPrice] = useState<number>(0);
    const [cartItems, setCartItems] = useState<Meal[]>([]);
    const [weeklyMenu, updateFoodMenu] = useState<MenuData>(null);

    useEffect(() => {

        if (cartPrice > 0) {
            localStorage.setItem('myCartData', JSON.stringify({
                cartPrice,
                cartItems
            }));
        } else {
            const myCart = localStorage.getItem('myCartData');
            if (myCart) {
                try {
                    const cart = JSON.parse(myCart);
                    if (cart.cartPrice > 0) {
                        setPrice(cart.cartPrice);
                        setCartItems(cart.cartItems);
                    }
                } catch (error) {
                    console.error('Error parsing localStorage context:', error);
                }
            }
        }
    }, [cartPrice, cartItems]);

    function binaryInsert(meals: Meal[], newMeal: Meal): Meal[] {
        if (meals.length === 0) return [newMeal];

        let low = 0;
        let high = meals.length - 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const midMeal = meals[mid];

            // Check for exact date match first for consistency
            if (newMeal.date && midMeal.date && newMeal.date === midMeal.date) {
                // Insert before existing meal with the same date
                return [...meals.slice(0, mid), newMeal, ...meals.slice(mid)];
            } else if (!newMeal.date || (newMeal.date && midMeal.date && newMeal.date < midMeal.date)) {
                // New meal comes before the middle element
                high = mid - 1;
            } else {
                // New meal comes after the middle element
                low = mid + 1;
            }
        }

        // If loop exits without finding an exact match, insert at the calculated index
        return [...meals.slice(0, low), newMeal, ...meals.slice(low)];
    }

    const updateCart = async (meal: Meal, servings: number) => {
        setCartItems((prevCartItems) => {
            const index = prevCartItems.findIndex((c: Meal) => c.id === meal.id);
            let newItems: Meal[] = [...prevCartItems];
            if (index > -1) {
                if (servings === 0) {
                    newItems.splice(index, 1);
                } else {
                    newItems[index].servings = servings;
                }
            } else {
                newItems = binaryInsert(newItems, {...meal, servings: servings})
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
        <QuantityContext.Provider value={{cartPrice, cartItems, updateCart, weeklyMenu, updateFoodMenu}}>
            {children}
        </QuantityContext.Provider>
    );
};

export {CartProvider, QuantityContext};

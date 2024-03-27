import React, { createContext, useState } from 'react';


interface QuantityContextProps {
    totalQuantity: number;
    updateQuantity: (productId: number, quantity: number) => void;
}

const QuantityContext = createContext<QuantityContextProps>({
    totalQuantity: 0,
    updateQuantity: () => {},
});

interface CartProviderProps {
    children: React.ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [totalQuantity, setTotalQuantity] = useState(0);

    const updateQuantity = (productId: number, quantity: number) => {
        setTotalQuantity((prevQuantity) => prevQuantity + quantity);
    };

    return (
        <QuantityContext.Provider value={{ totalQuantity, updateQuantity }}>
            {children}
        </QuantityContext.Provider>
    );
};

export { QuantityContext, CartProvider };

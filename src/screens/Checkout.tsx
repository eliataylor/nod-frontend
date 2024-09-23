import React, {useContext, useRef, useState} from 'react';
import {Box, Divider, Typography} from "@mui/material";
import {QuantityContext} from "../CartProvider";
import TextField from "@mui/material/TextField";
import OrderItem from "../components/OrderItem";
import {useTheme} from "@mui/styles";
import {Theme} from "@mui/material/styles";
import {Link} from "react-router-dom";
import ApiClient from "../ApiClient";
import {
    TypeFieldSchema,
    FieldTypeDefinition,
    NAVITEMS,
    EntityTypes,
    Orders,
    RelEntity
} from "../object-actions/types/types";
import GenericForm from "../object-actions/forms/GenericForm";
import {nearestDay} from "../Utils";

const Checkout = () => {
    const theme = useTheme() as Theme;

    const [hasCopied, setHasCopied] = useState(false);
    const inputRef = useRef(null);


    const {cartPrice, cartItems, program} = useContext(QuantityContext)
    const priceString = cartPrice.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    const handleCopy = (event: React.MouseEvent<HTMLInputElement>) => {
        const textArea = document.createElement('textarea');
        textArea.value = JSON.stringify(cartItems, null, 2);
        document.body.appendChild(textArea);
        textArea.select();
        // event.currentTarget.select();
        try {
            const successful = document.execCommand('copy');
            setHasCopied(successful);
        } catch (err) {
            console.error('Failed to copy text:', err);
        } finally {
            document.body.removeChild(textArea);
        }
    };

    const mealPlan = cartItems.map(c => {
        return {date: c.date, title: c.title, servings: c.servings, id: c.id}
    })

    const buildMailTo = (): string => {
        let href = 'mailto:info@nourishmentondemand.com'
        href += '?subject=' + encodeURIComponent('My Meal Plan');
        href += '&body=' + encodeURIComponent(JSON.stringify(mealPlan));
        return href;
    }

    const buildOrder = ():Orders => {
        const order: any = {
            start_date:program.start_date ?? nearestDay(new Date(), 7),
            glass_containers: program.use_glass ?? false
        }
        const orderItems = cartItems.map(item => {
            const test = 1
            return {'id':item.id, 'str':item.title, '_type':'Meal', entity:item}
        })
        order.order_items = orderItems

        return order;

    }

    const postMealData = (entity:EntityTypes): void => {
        const order:any = {
            ...buildOrder(),
            ...entity
        }

        console.log(order)

        const response = ApiClient.post(`/orders`, order)
    }

    const hasUrl = NAVITEMS.find(nav => nav.type === `Orders`);
    if (!hasUrl) return <Typography>Unknown Type</Typography>

    const fields: FieldTypeDefinition[] = []
    const allowed = ['start_date', 'delivery_instructions', 'customizations', 'glass_containers', 'recurring']
    allowed.forEach((field_name) => {
        fields.push(TypeFieldSchema[hasUrl.type][field_name])
    })



    return (
        <Box style={{padding:"1%"}}>
            {cartPrice > 0 ?
                <Box >
                    <GenericForm
                        fields={fields}
                        original={buildOrder()}
                        navItem={hasUrl}
                        onSubmit={postMealData}
                    />

                </Box>
                :
                <Typography variant={'h6'} style={{textAlign: 'center'}} gutterBottom={true}>There's nothing in your cart</Typography>
            }

            {cartPrice > 0 &&
                <Box margin={"20px auto"}>

                    <Link to={'/menus'}>
                        Restart Order
                    </Link>


                    <Divider />

                    <Typography variant={'h6'}>Review my meal plan</Typography>
                    {cartItems.map(meal => <OrderItem
                        key={`meal-${meal.id}`}
                        meal={meal}
                        show_servings={true} show_price={true} show_date={true} hideIfMissing={''}  show_bld={false} />)
                    }
                </Box>
            }

        </Box>
    );
};

export default Checkout;

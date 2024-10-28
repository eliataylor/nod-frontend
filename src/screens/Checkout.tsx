import React, {useContext, useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {QuantityContext} from "../CartProvider";
import OrderItem from "../components/OrderItem";
import {Link} from "react-router-dom";
import ApiClient from "../ApiClient";
import {EntityTypes, FieldTypeDefinition, NAVITEMS, Orders, TypeFieldSchema} from "../object-actions/types/types";
import GenericForm from "../object-actions/forms/GenericForm";
import {nearestDay} from "../Utils";

const Checkout = () => {

    const [email, setEmail] = useState<string>('')
    const {cartPrice, cartItems, program, clearCart} = useContext(QuantityContext)

    const buildOrder = (): Orders => {
        const order: any = {
            start_date: program.start_date ?? nearestDay(new Date(), 7),
            glass_containers: program.use_glass ?? false
        }
        /*
        const orderItems = cartItems.map(item => {
            const test = 1
            return {'id': item.id, 'str': item.title, '_type': 'Meal', entity: item}
        })
        */
        order.order_items = cartItems
        order.program = program;
        order.cartPrice = cartPrice;

        return order;

    }

    const postMealData = (entity: EntityTypes | FormData): void => {
        const order: any = {
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
        <Box style={{padding: "1%"}}>

            <Box sx={{textAlign: 'right', marginBottom:2}}>
                <Button size={'small'}>
                    <Link onClick={() => clearCart()} to={'/menus'}>
                        CLEAR CART
                    </Link>
                </Button>
            </Box>

            {cartPrice > 0 ?
                <Box>
                    <TextField
                        fullWidth
                        name={'email'}
                        label={'Email'}
                        type={'email'}
                        value={email}
                        helperText={'to verify this order'}
                        sx={{marginBottom: 5}}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <GenericForm
                        fields={fields}
                        original={buildOrder()}
                        navItem={hasUrl}
                        onSubmit={postMealData}
                    />

                </Box>
                :
                <Typography variant={'h6'} style={{textAlign: 'center'}} gutterBottom={true}>There's nothing in your
                    cart</Typography>
            }

            {cartPrice > 0 &&
                <Box margin={"20px auto"}>

                    <Typography variant={'caption'}>Review {program.program_name ?? "my meal plan"} order</Typography>
                    {cartItems.map(meal => <OrderItem
                        key={`meal-${meal.id}`}
                        meal={meal}
                        show_servings={true} show_price={true} show_date={true} hideIfMissing={''} show_bld={false}/>)
                    }
                </Box>
            }

        </Box>
    );
};

export default Checkout;

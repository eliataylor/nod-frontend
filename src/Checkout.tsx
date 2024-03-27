import React, {useContext} from 'react';
import {Box, Grid, Typography} from "@mui/material";
import {QuantityContext} from "./CartProvider";
import TextField from "@mui/material/TextField";

const Checkout = () => {

    const {cartPrice, cartItems} = useContext(QuantityContext)
    const priceString = cartPrice.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })

    const handleCopy = (event:React.MouseEvent<HTMLInputElement>) => {
        const textArea = document.createElement('textarea');
        textArea.value = JSON.stringify(cartItems, null, 2);
        document.body.appendChild(textArea);
        textArea.select();

        try {
            const successful = document.execCommand('copy');
        } catch (err) {
            console.error('Failed to copy text:', err);
        } finally {
            document.body.removeChild(textArea);
        }
    };

    const mealPlan = cartItems.map(c => {
        return {id: c.id, title: c.title, servings: c.servings}
    })

    return (
        <Box style={{maxWidth: 400, margin: 'auto'}}>
            {cartPrice > 0 ?
                <React.Fragment>
                    <Typography variant={'body1'}>
                        To complete your order please:
                    </Typography>
                    <ul>
                        <li>Pay {priceString} for your plan via any method below</li>
                        <li>Copy and Email your order data <a href={'mailto:orders@nourishmentondemand.com'}
                                                              target={'_blank'}>orders@nourishmentondemand.com</a></li>
                    </ul>
                    <div style={{margin:'10px '}}>
                        <TextField
                            fullWidth={true}
                            type="text"
                            variant={'filled'}
                            aria-readonly={true}
                            multiline={true}
                            rows={5}
                            value={JSON.stringify(mealPlan, null, 2)}
                            label="My Meal Plan"
                            InputProps={{
                                readOnly: true,
                                onClick: handleCopy,
                            }}
                        />
                    </div>

                </React.Fragment>
                :
                <Typography variant={'h6'} style={{textAlign:'center'}} gutterBottom={true} >Accepting payments through </Typography>
            }
            <Grid container justifyContent={'space-between'} style={{textAlign:'center'}}>
                <Grid item xs={4}>
                    <Typography variant={'overline'}>Venmo</Typography>
                    <img src={'/venmo.jpeg'} width={100}/>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant={'overline'}>Zelle</Typography>

                </Grid>
                <Grid item xs={4}>
                    <Typography variant={'overline'}>PayPal</Typography>

                </Grid>
            </Grid>

        </Box>
    );
};

export default Checkout;

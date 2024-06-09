import React, {useContext, useRef, useState} from 'react';
import {Box, Divider, Typography} from "@mui/material";
import {QuantityContext} from "../CartProvider";
import TextField from "@mui/material/TextField";
import OrderItem from "../components/OrderItem";
import {useTheme} from "@mui/styles";
import {Theme} from "@mui/material/styles";

const Checkout = () => {
    const theme = useTheme() as Theme;

    const [hasCopied, setHasCopied] = useState(false);
    const inputRef = useRef(null);


    const {cartPrice, cartItems} = useContext(QuantityContext)
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

    return (
        <Box style={{padding:"1%"}}>
            {cartPrice > 0 ?
                <Box >
                    <Typography variant={'h6'}>
                         Please copy and email your meal plan data below to  <a href={buildMailTo()}
                                                                                             style={{color:theme.palette.secondary.main}}
                                                                                             target={'_blank'}>info@NourishmentOnDemand.com</a>. We'll respond with confirmation and payment options.
                    </Typography>
                    <div style={{margin: '10px auto'}}>
                        <TextField
                            fullWidth={true}
                            type="text"
                            variant={'standard'}
                            aria-readonly={true}
                            style={{color:theme.palette.grey[600]}}
                            value={JSON.stringify(mealPlan)}
                            label="My Meal Plan"
                            inputRef={inputRef}
                            InputProps={{
                                readOnly: true,
                                onClick: handleCopy,
                            }}
                            helperText={hasCopied ? 'Meal Plan copied to clipboard!' : ''}
                        />
                    </div>

                </Box>
                :
                <Typography variant={'h6'} style={{textAlign: 'center'}} gutterBottom={true}>Accepting payments
                    through </Typography>
            }
            {/*
            <Grid container justifyContent={'space-between'} style={{textAlign: 'center'}}>
                <Grid item xs={4} >
                    <Typography variant={'overline'}>Venmo</Typography>
                    <Typography variant={'body2'}>@SKT-Designs</Typography>
                    <img src={'/venmo.jpeg'} width={100}/>
                </Grid>
                <Grid item xs={4} >
                    <Typography variant={'overline'}>Zelle</Typography>
                    <Typography variant={'body2'}>415-966-8442</Typography>
                    <img src={'/zelle.png'} width={100}/>
                </Grid>
                <Grid item xs={4} >
                    <Typography variant={'overline'}>PayPal</Typography>
                    <Typography variant={'body2'}>samanta.amna@gmail.com</Typography>
                    <img src={'/paypal.png'} width={100} />
                </Grid>
            </Grid>
*/}

            {cartPrice > 0 &&
                <Box margin={"20px auto"}>
                    <Divider />

                    <Typography variant={'h6'}>Review my meal plan</Typography>
                    {cartItems.map(meal => <OrderItem showServings={true} key={`meal-${meal.id}`} meal={meal}/>)}
                </Box>
            }

        </Box>
    );
};

export default Checkout;

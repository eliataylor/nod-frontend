import React, {useContext} from 'react';
import {OrderItems, QuantityContext} from "../CartProvider";
import {Box, Typography} from "@mui/material";
import {CheckCircle} from "@mui/icons-material";
import {useTheme} from "@mui/styles";
import {Theme} from "@mui/material/styles";
import {countConsecutiveDays, has3PlusServings} from "../Utils";

const ActivePromotions: React.FC = () => {
    const theme = useTheme() as Theme;
    const {cartItems} = useContext(QuantityContext)

    const hasFullWeek = countConsecutiveDays(cartItems) > 6 ? true : false;
    const servingsPromo = has3PlusServings(cartItems);

    return (
        <Box mb={1}>
            <Typography variant={'h6'}>CREATE YOUR MEAL PROGRAM</Typography>
            <Typography variant={'body2'} style={{display: 'flex', alignItems: 'center'}}>
                {servingsPromo ?
                    <CheckCircle sx={{fontSize: 20, marginRight: 1}} color={'secondary'}/>
                    :
                    <CheckCircle sx={{fontSize: 14, marginRight: 1, color: theme.palette.grey[300]}}/>
                }
                <span>5% off for 3 or more servings on any meal</span>
            </Typography>
            <Typography variant={'body2'} style={{display: 'flex', alignItems: 'center'}}>
                {hasFullWeek === true ?
                    <CheckCircle sx={{fontSize: 20, marginRight: 1}} color={'secondary'}/>
                    :
                    <CheckCircle sx={{fontSize: 14, marginRight: 1, color: theme.palette.grey[300]}}/>
                }
                <span>10% for whole week subscriptions</span>
            </Typography>
            <Typography variant={'body2'} style={{display: 'flex', alignItems: 'center'}}><CheckCircle
                sx={{fontSize: 14, marginRight: 1, color: theme.palette.grey[300]}}/> <span>Free addon with three or more days (select at checkout)</span></Typography>
            <Typography variant={'body2'} style={{display: 'flex', alignItems: 'center'}}><CheckCircle
                sx={{fontSize: 14, marginRight: 1, color: theme.palette.grey[300]}}/> <span>Enable substitutions and recipes requests with Monthly subscriptions</span></Typography>
        </Box>
    );
};

export default ActivePromotions;

import React, {useContext} from 'react';
import {QuantityContext} from "../CartProvider";
import {List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {CheckCircle} from "@mui/icons-material";
import {useTheme} from "@mui/styles";
import {Theme} from "@mui/material/styles";
import {countConsecutiveDays, has3PlusServings} from "../Utils";

const ActivePromotions: React.FC = () => {
    const {cartItems} = useContext(QuantityContext)

    const hasFullWeek = countConsecutiveDays(cartItems) > 6 ? true : false;
    const servingsPromo = has3PlusServings(cartItems);

    return (
        <List dense={true} sx={{margin:0}}>
            <ListItem>
                <ListItemAvatar sx={{minWidth:35}}>
                    <CheckCircle fontSize={"small"} color={servingsPromo ? 'secondary' : 'disabled'}/>
                </ListItemAvatar>
                <ListItemText primary="5% off for 3 or more servings on any meal"/>
            </ListItem>
            <ListItem>
                <ListItemAvatar sx={{minWidth:35}}>
                    <CheckCircle fontSize={"small"} color={hasFullWeek ? 'secondary' : 'disabled'}/>
                </ListItemAvatar>
                <ListItemText>10% for whole week subscriptions</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemAvatar sx={{minWidth:35}}>
                    <CheckCircle fontSize={"small"} color={'disabled'}/>
                </ListItemAvatar>
                <ListItemText>Free addon with three or more days (select at checkout)</ListItemText></ListItem>
            <ListItem>
                <ListItemAvatar sx={{minWidth:35}}>
                    <CheckCircle fontSize={"small"} color={'disabled'}/>
                </ListItemAvatar>
                <ListItemText>Enable substitutions and recipes requests with Monthly subscriptions</ListItemText>
            </ListItem>
        </List>
    );
};

export default ActivePromotions;

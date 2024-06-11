import React, {useContext} from 'react';
import {NumberInputProps, Unstable_NumberInput as BaseNumberInput,} from '@mui/base/Unstable_NumberInput';
import {styled} from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import {Meal, QuantityContext} from '../CartProvider';
import {useTheme} from "@mui/styles";
import {Theme} from "@mui/material/styles";

export interface MealProps {
    meal: Meal;
}

const NumberInput = React.forwardRef(function CustomNumberInput(
    props: NumberInputProps,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    return (
        <BaseNumberInput
            slots={{
                root: StyledInputRoot,
                input: StyledInput,
                incrementButton: StyledButton,
                decrementButton: StyledButton,
            }}
            slotProps={{
                incrementButton: {
                    children: <AddIcon fontSize="small" color={'primary'} />,
                    className: 'increment',
                },
                decrementButton: {
                    children: <RemoveIcon fontSize="small"/>,
                },
            }}
            {...props}
            ref={ref}
        />
    );
});


const StyledInputRoot = styled('div')(
    ({theme}) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
    box-shadow: 0px 2px 4px ${
        theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
    };
`,
);

const StyledInput = styled('input')(
    ({theme}) => `
  font-size: 12px;
  font-family: inherit;
  font-weight: 400;
  color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[900]};
  background: ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200]};
  margin: 0;
  padding:10px 3px;
  outline: 0;
  min-width: 0;
  height:25px;
  width: 2rem;
  text-align: center;

  &:hover {
    border-color: ${theme.palette.primary.main};
  }

  &:focus {
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main};
  }

  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledButton = styled('button')(
    ({theme}) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-color: ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200]};
  background: ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50]};
  color: ${theme.palette.mode === 'dark' ? theme.palette.grey[200] : theme.palette.grey[900]};
  height:25px;
  height:25px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main};
    border-color: ${theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main};
    color: ${theme.palette.grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`,
);


const MealQuantity: React.FC<MealProps> = ({meal}) => {
    const {updateCart} = useContext(QuantityContext);
    const theme = useTheme() as Theme;

    const handleChange = (
        event: React.FocusEvent<HTMLInputElement> | React.PointerEvent | React.KeyboardEvent,
        value: number | null,
    ) => {
        const newQuantity = value || 0;
        updateCart(meal, newQuantity);
    };

    return <NumberInput
        aria-label="Servings"
        id={`quantity-${meal.id}`}
        defaultValue={meal.servings}
        value={meal.servings}
        onChange={handleChange}
        min={0} max={99}/>
};

export default MealQuantity;

// src/components/PostOp.tsx
import React from 'react';
import {Container, FormGroup, Typography} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// import FormHelperText from '@mui/material/FormHelperText';


interface MealProps {
    name: string;
    description?: string;
    price?: number;
}


interface PlanProps {
    title: string;
    meals: MealProps[];
    price?: string;
}

const Pick1: React.FC<PlanProps> = ({title, meals}) => {
    const [value, setValue] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return <FormControl fullWidth={true} sx={{marginTop: 2}}>
        <FormLabel id={`plan-${title}-radio-group`}>{title}</FormLabel>
        <RadioGroup
            aria-labelledby={`plan-${title}-radio-group`}
            value={value}
            onChange={handleChange}
        >
            {meals.map((meal, index) => (
                <FormControlLabel value={meal.name} control={<Radio size={'small'}/>} label={<React.Fragment>
                    <Typography variant={'body1'} component={'span'}>{meal.name}</Typography>
                    {/* <Typography variant={'subtitle2'} component={'span'}
                                sx={{color: 'primary.main', marginLeft: 1}}>${meal.price}</Typography> */}
                </React.Fragment>}/>
            ))}
        </RadioGroup>
    </FormControl>
};

const PickMany: React.FC<PlanProps> = ({title, meals}) => {
    const [state, setState] = React.useState<{ [key: string]: boolean }>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    return <FormControl fullWidth={true} sx={{marginTop: 2}}>
        <FormLabel id={`plan-${title}-radio-group`}>{title}</FormLabel>
        <FormGroup>
            {meals.map((meal, index) => (
                <FormControlLabel value={meal.name} control={<Checkbox
                    checked={state[meal.name]} onChange={handleChange} name={meal.name}
                    size={'small'}/>} label={<React.Fragment>
                    <Typography variant={'body1'} component={'span'}>{meal.name}</Typography>
                    {/* <Typography variant={'subtitle2'} component={'span'}
                                sx={{color: 'primary.main', marginLeft: 1}}>${meal.price}</Typography> */}
                </React.Fragment>}
                />
            ))}
        </FormGroup>
    </FormControl>
};


const AllIncluded: React.FC<PlanProps> = ({title, meals}) => {

    return <FormControl fullWidth={true} sx={{marginTop: 2}}>
        <Typography variant={'subtitle1'} >{title}</Typography>
        <FormGroup>
            {meals.map((meal, index) => (
                <FormControlLabel value={meal.name} control={<Checkbox checked={true} size={'small'}/>} label={<React.Fragment>
                    <Typography variant={'body1'} component={'span'}>{meal.name}: </Typography>
                    <Typography variant={'body1'} component={'span'} sx={{marginLeft:.5}}>{meal.description}</Typography>
                </React.Fragment>}/>
            ))}
        </FormGroup>
    </FormControl>
};


const PostOp: React.FC = () => {
    const plans = [
        {
            title: 'Day of Surgery',
            meals: [
                {name: 'Gut-Healing Juice', description: 'Watermelon, Mint, Aloe Vera Juice '},
                {
                    name: 'Anti-nausea Nourishment',
                    description: 'Kitchari (rice with lentils) simmered in a healing herbal broth with 2 cups of kale and ...'
                },
            ],
            type: 'include'
        },
        {
            title: 'Post-Op Day One',
            meals: [
                {name: 'Ginger Chicken soup with Turmeric', price: 70},
                {name: 'Borscht (Nourishing Beet Soup)', price: 60},
                {name: 'Squash and Red Lentil Soup', price: 60},
                {name: 'Quinoa, Lentils, and Greens Soup', price: 60},
                {name: 'Lemongrass Ginger Chicken and Lime Soup', price: 70}
            ],
            type: 'pick1'
        },
        {
            title: 'Post-Op Day Two',
            meals: [
                {name: 'Chicken Wild Rice Soup', price: 70},
                {name: 'Slow-Cooked Wagyu Beef Stew', price: 90},
                {name: 'Ginger Fried Rice', price: 50},
                {name: 'Paleo Chicken Potpie', price: 70},
                {name: 'Roasted Bone Broth and Ginger Porridge', price: 70},

            ],
            type: 'pick1'
        },
        {
            title: 'Post-Op Day Three',
            meals: [
                {name: 'Hearty Sausage Rolls', price: 50},
                {name: 'Baked Rosemary + Fenugreek Sweet Potatoes', price: 50},
                {name: 'Bone Broth Rice, garlic, fenugreek, minced spinach and kale', price: 60},
            ],
            type: 'pick1'
        },
        {
            title: 'Healing Support Snacks',
            meals: [
                {name: 'High Protein Energy Balls (4 count) (nut-free available)', price: 24},
                {name: 'Hormone-balancing Bliss Bites (8 count)', price: 40},
                {name: 'Passionfruit and Coconut Macaroons (8 count)', price: 40},
                {name: 'Breastfeeding Brownies (8 count)', price: 40},
                {name: 'Lactation Energy Bites (4 count)', price: 24},
                {name: 'Sweet Potato Muffins (6 count)', price: 30},
            ],
            type: 'pickmany'
        }
    ];

    return (
        <Container className="inter">
            <Typography variant="h6" style={{fontSize: 16, fontWeight: 700, marginBottom: 10}}>
                Post Operative Menu
            </Typography>

            {plans.map((plan, index) => {
                if (plan.type === 'pick1') {
                    return <Pick1 key={index} title={plan.title} meals={plan.meals}/>
                }
                if (plan.type === 'pickmany') {
                    return <PickMany key={index} title={plan.title} meals={plan.meals}/>
                }

                return <AllIncluded key={index} title={plan.title} meals={plan.meals}/>
            })}
        </Container>
    );
};

export default PostOp;

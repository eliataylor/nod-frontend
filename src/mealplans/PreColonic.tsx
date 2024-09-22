// src/components/PreColonic.tsx
import React from 'react';
import {Box, Container, Typography} from '@mui/material';

interface MealProps {
    name: string;
    description: string;
    price?: string;
}

const Meal: React.FC<MealProps> = ({name, description, price = undefined}) => {
    return (
        <Typography variant="body1" style={{fontSize: 12}}>
            {name.length > 1 ?
                <strong style={{fontWeight: 600}}>{name}:&nbsp;</strong>
                : name.length > 0 ? <strong style={{fontWeight: 900}}>{name} &nbsp; </strong>
                    : null}
            {description}

            {price &&
                <Typography variant={'body1'} style={{fontWeight: 800, fontSize: 12, display:'inline'}} color={'primary'}>&nbsp; {price}</Typography>}
        </Typography>
    );
};


interface PlanProps {
    title: string;
    meals: { name: string; description: string }[];
    price?: string;
}

const Plan: React.FC<PlanProps> = ({title, meals}) => {
    return (
        <Box sx={{margin: '0 0 20px 0'}}>
            <Typography variant="body2" color={'primary'} style={{fontSize: 13, fontWeight: 700, marginBottom: 5}}>
                {title}
            </Typography>
            {meals.map((meal, index) => (
                <Meal key={index} name={meal.name} description={meal.description}/>
            ))}
        </Box>
    );
};


const PreColonic: React.FC = () => {
    const plans = [
        {
            title: 'Day One: Pre-Colonic Meal Prep',
            meals: [
                {name: 'Breakfast', description: 'Celery Apple Mint and Cucumber Juice'},
                {name: 'Lunch', description: 'Squash and Red Lentil Soup'},
                {
                    name: 'Dinner',
                    description: 'DETOX: Pineapple, Lemon, Ginger, Collard Greens, Celery, Parsley, Cucumber, Spinach'
                },
                {name: 'Post-dinner drink', description: 'Digestive Support Tea'},
            ],
            price: '$75',
        },
        {
            title: 'Day Two: Post-Colonic Meal Prep',
            meals: [
                {name: 'Breakfast', description: 'Detoxing Green Breakfast Smoothie'},
                {name: 'Lunch', description: 'Basic Quinoa Salad'},
                {name: 'Dinner', description: 'Lemongrass Ginger Chicken and Lime Soup'},
                {name: 'Post-dinner drink', description: 'Digestive Support Tea'},
            ],
            price: '$75',
        },
    ];
    const pricing = [
        {
            name: 'One Day Pre-Colonic Meal Prep',
            description: 'This program is ideal for the day before a colonic or the day of. Includes two juices, one soup, and an herbal tea. All organic, local, and made fresh upon delivery.',
            price: '$75'
        },
        {
            name: 'One Day Post-Colonic Gut-Healing Meal Prep',
            description: 'This program is ideal for the day after a colonic. Includes one smoothie, a salad, and a soup, along with an herbal tea. All organic, local, and made fresh upon delivery.',
            price: '$75'
        },
        {
            name: 'Two Day Colonic Meal Prep',
            description: 'This program includes 6 meals and two herbals teas to allow you to fully prepare and heal your body before and after your colonic session(s).',
            price: '$150'
        },
    ]

    // juice cleanse:
    const juiceData = [
        {
            "title": "Day One",
            "meals": [
                {name: "Breakfast", description: "PREPARE: Cilantro Cucumber, Lemon, Kale, Green Apple"},
                {
                    name: "Lunch",
                    description: "DETOX: Pineapple, Lemon, Ginger, Collard Greens, Celery, Parsley, Cucumber, Spinach"
                },
                {name: "Dinner", description: "Zucchini and Basil Soup"}
            ]
        },
        {
            "title": "Day Two",
            "meals": [
                {
                    name: "Breakfast",
                    description: "HEAL: Green Apple, Lemon, Ginger, Kale, Romaine, Cucumber, Fennel Bulb, Pineapple, Turmeric"
                },
                {name: "Lunch", description: "Hydrating Honeydew Gazpacho"},
                {name: "Dinner", description: "Spinach-Artichoke Soup"}
            ]
        },
        {
            "title": "Day Three",
            "meals": [
                {name: "Breakfast", description: "PREPARE, description:Cilantro Cucumber, Lemon, Kale, Green Apple"},
                {name: "Lunch", description: "Cucumber Avocado Gazpacho"},
                {
                    name: "Dinner",
                    description: "Creamy Cauliflower Soup with Garlic-Seed Croutons (100% Dairy+Gluten free)"
                }
            ]
        }
    ]

    const juicePricing = [
        {
            "name": "Two Day Juice Cleanse",
            "price": "$80",
            "description": "This program includes three juices and three soups. All Organic and locally sourced. Made fresh on the day of delivery."
        },
        {
            "name": "Three Day Juice Cleanse",
            "price": "$120",
            "description": "This program includes four juices and five soups. All Organic and locally sourced. Made fresh on the day of delivery."
        }
    ]


    return (
        <Container className="inter">
            <Typography variant="h6" style={{fontSize: 16, fontWeight: 700, marginBottom: 10}}>
                Meal Prep Menu
            </Typography>
            {plans.map((plan, index) => (
                <Plan key={index} title={plan.title} meals={plan.meals}/>
            ))}
            <Typography variant="h6" style={{fontSize: 16, fontWeight: 700, marginBottom: 10}}>
                Pricing
            </Typography>
            {pricing.map((planprice) => {
                return <Box mb={1}>
                    <Typography variant="body1" style={{fontWeight: 800, fontSize: 13}}>
                        <strong style={{textDecoration: "underline"}}>{planprice.name} </strong> &nbsp;
                        <Typography variant={'body1'} style={{fontWeight: 800, fontSize: 13, display:'inline'}} color={'primary'}>{planprice.price}</Typography>
                    </Typography>
                    <Typography variant="body2" style={{fontStyle: 'italic', fontSize: 12}}>
                        {planprice.description}
                    </Typography>
                </Box>
            })}

            <Typography variant="h6" style={{fontSize: 16, fontWeight: 700, marginBottom: 10, marginTop: 20}}>
                Juice Cleanse Menu
            </Typography>
            {juiceData.map((plan, index) => (
                <Plan key={index} title={plan.title} meals={plan.meals}/>
            ))}
            <Typography variant="h6" style={{fontSize: 16, fontWeight: 700, marginBottom: 10}}>
                Pricing
            </Typography>
            {juicePricing.map((planprice) => {
                return <Box mb={1}>
                    <Typography variant="body1" style={{fontWeight: 800, fontSize: 13}}>
                        <strong style={{textDecoration: "underline"}}>{planprice.name} </strong> &nbsp;
                        <Typography variant={'body1'} style={{fontWeight: 800, fontSize: 13, display:'inline'}} color={'primary'}>{planprice.price}</Typography>
                    </Typography>
                    <Typography variant="body2" style={{fontStyle: 'italic', fontSize: 12}}>
                        {planprice.description}
                    </Typography>
                </Box>
            })}


            <Typography variant="h6" style={{fontSize: 16, fontWeight: 700, marginBottom: 10, marginTop: 20}}>
                A la Carte Juices and Soups
            </Typography>


            <Typography variant="body2" color={'primary'} style={{fontSize: 13, fontWeight: 700}}>
                Juices
            </Typography>
            <Typography variant="body2" style={{fontStyle: 'italic', fontSize: 12}}>
                These juices are great add-ons to any healing protocol.
            </Typography>

            <Box component={'ul'} mt={1} mb={1} pl={2} ml={0}>
                <li><Meal name={"PREPARE"} description={"Cilantro Cucumber, Lemon, Kale, Green Apple"} price={"$12"}/></li>
                <li><Meal name={"SOOTHE"} description={"Aloe Vera, Honeydew, Coconut Water, Lime"} price={"$12"}/></li>
                <li><Meal name={"HEAL"}
                      description={"Green Apple, Lemon, Ginger, Kale, Romaine, Cucumber, Fennel Bulb, Pineapple, Turmeric"}
                      price={"$12"}/></li>
                <li><Meal name={"DETOX"}
                      description={"Pineapple, Lemon, Ginger, Collard Greens, Celery, Parsley, Cucumber, Spinach"}
                      price={"$12"}/></li>
                <li><Meal name={"ROOTS"} description={"Apple Beet Carrot"} price={"$12"}/></li>
            </Box>

            <Typography variant="body2" color={'primary'} style={{fontSize: 13, fontWeight: 700}}>
                Soups
            </Typography>
            <Typography variant="body2" style={{fontStyle: 'italic', fontSize: 12}}>
                Each purchase comes with about 32 oz of each soup. About two servings.
            </Typography>

            <Box component={'ul'} mt={1} mb={1} pl={2} ml={0}>
                    <li><Meal name={""} description={"Hydrating Honeydew Gazpacho"} price={"$18"}/></li>
                    <li><Meal name={""} description={"Zucchini and Basil Soup"} price={"$18"}/></li>
                    <li><Meal name={""} description={"Spinach-Artichoke Soup"} price={"$18"}/></li>
                    <li><Meal name={""} description={"Cucumber Avocado Gazpacho"} price={"$18"}/></li>
                    <li><Meal name={""}
                              description={"Creamy Cauliflower Soup with Garlic-Seed Croutons (100% Dairy+Gluten free)"}
                              price={"$18"}/></li>
            </Box>

        </Container>
    );
};

export default PreColonic;

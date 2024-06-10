import React, {useState} from 'react';
import {Divider, FormControl, FormLabel, Grid, Radio, RadioGroup, Typography} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {nearestDay} from "../Utils";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import PriceOption from "./PriceOption";

interface Program {
    program_name: string;
    meals: string[];
    meal_count: number;
    start_date: string;
    use_glass: boolean;
}

const defaultProgram: Program = {
    program_name: 'Meal Prep',
    meals: [],
    meal_count: 0,
    start_date: nearestDay(new Date(), 7),
    use_glass: false
}

const ProgramForm: React.FC<Partial<Program>> = (props) => {
    const [program, setProgram] = useState<Program>({...defaultProgram, ...props});

    const setOptsMeals = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const newState = {...program};
        const has = newState.meals.indexOf(value);
        if (has > -1) {
            newState.meals.splice(has, 1);
        } else {
            newState.meals.push(value);
        }
        setProgram(newState);
    };

    return <Grid container direction={'column'} gap={4}
                 sx={{maxWidth: 600, margin: '20px auto'}}>

        <Grid item><Typography variant={'h5'}
                               sx={{fontSize: 22, fontWeight: 800}}
                               color={'primary.main'}>{program.program_name}</Typography></Grid>


        <Grid container justifyContent={'space-between'} alignItems={'center'}>
            <Grid item><Typography variant={'h6'}
                                   sx={{fontSize: 14, fontWeight: 800}}
                                   color={'primary.main'}>YOUR MEALS</Typography></Grid>
            <Grid item>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={program.meals.includes('lunch')}
                            value={'lunch'}
                            onChange={(e) => setOptsMeals(e)}
                        />
                    }
                    label={'Lunch'}
                />
            </Grid>
            <Grid item>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={program.meals.includes('dinner')}
                            value={'dinner'}
                            onChange={(e) => setOptsMeals(e)}
                        />
                    }
                    label={'dinner'}
                />
            </Grid>
        </Grid>

        <Divider/>

        <Grid item><Typography variant={'h6'}
                               sx={{fontSize: 14, fontWeight: 800}}
                               color={'primary.main'}>SUBSCRIPTION OPTIONS</Typography></Grid>

        <Grid item>
            <FormControl>
                <FormLabel sx={{color: 'main.primary'}} id="subscription-group-label">Weekly</FormLabel>
                <RadioGroup
                    aria-labelledby="subscription-group-label"
                    defaultValue="female"
                    name="subscription-group"
                >
                    <FormControlLabel value={4} control={<Radio size={'small'}/>}
                                      label={
                                          <PriceOption
                                              price={64}
                                              period={'per week'}
                                              title={'2 Days (Thurs - Fri)'}
                                              extraLines={['4 Meals', 'Delivered Wednesday evenings']}/>
                                      }
                    />
                    <FormControlLabel value={6} control={<Radio size={'small'}/>}
                                      label={
                                          <PriceOption
                                              price={96}
                                              period={'per week'}
                                              title={'3 Days (Mon - Wed)'}
                                              extraLines={['6 Meals', 'Delivered Sunday evenings']}/>
                                      }
                    />
                    <FormControlLabel value={10} control={<Radio size={'small'}/>}
                                      label={
                                          <PriceOption
                                              price={160}
                                              period={'per week'}
                                              title={'5 Days (Mon - Fri)'}
                                              extraLines={['10 Meals', 'Delivered Sunday & Wednesday evenings']}/>
                                      }
                    />

                    <FormLabel color={'primary'} id="subscription-group-monthly">Monthly</FormLabel>

                    <FormControlLabel value={20} control={<Radio size={'small'}/>}
                                      label={
                                          <PriceOption
                                              price={320}
                                              period={'every 2 weeks'}
                                              title={'2 Weeks (Mon - Fri)'}
                                              extraLines={['20 Meals', 'Option to Skip, Pause, Cancel meals with ease']}/>
                                      }
                    />
                    <FormControlLabel value={40} control={<Radio size={'small'}/>}
                                      label={
                                          <PriceOption
                                              price={640}
                                              period={'per month'}
                                              title={'1 Month (Mon - Fri)'}
                                              extraLines={['30 Meals', 'Option to Skip, Pause, Cancel meals with ease.', 'Free Green Smoothie once a week']}/>
                                      }
                    />
                </RadioGroup>
            </FormControl>
        </Grid>

        <Divider/>

        <Grid item>
            <DatePicker/>
        </Grid>

        <Grid item>

            <Typography variant={'h6'}
                        sx={{fontSize: 14, fontWeight: 800}}
                        color={'primary.main'}>REUSABLE GLASS CONTAINERS</Typography>


            <Typography variant={'body2'}>In hopes to reduce our carbon footprint, we offer the option for glass
                containers for $50. The containers can be left where your deliveries are received and they will be
                picked up each delivery day. </Typography>
        </Grid>

    </Grid>
        ;
};

export default ProgramForm;

import React, {useState} from 'react';
import {Divider, FormControl, FormLabel, Grid, Radio, RadioGroup, Typography} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import PriceOption from "./PriceOption";
import {ThemedButton} from "../theme/GlobalStyles";
import {defaultProgram, Program} from "../CartProvider";
import {useNavigate} from 'react-router-dom';

const ProgramForm: React.FC<Partial<Program>> = (props) => {
    const [program, setProgram] = useState<Program>({...defaultProgram, ...props});
    const navigate = useNavigate();

    const setOptsMeals = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const newState = {...program};
        const has = newState.bld.indexOf(value);
        if (has > -1) {
            newState.bld.splice(has, 1);
        } else {
            newState.bld.push(value);
        }
        setProgram(newState);
    };

    const setOptsGlass = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = (event.target as HTMLInputElement).checked;
        const newState = {...program};
        newState.use_glass = val;
        setProgram(newState);
    };

    const handleChangeSubscription = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = (event.target as HTMLInputElement).value;
        const newState = {...program};
        newState.subscription_level = parseInt(val);
        setProgram(newState);
    };

    const handleChangeServings = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = (event.target as HTMLInputElement).value;
        const newState = {...program};
        newState.servings = parseInt(val);
        setProgram(newState);
    };

    const handleSubmit = () => {
        setProgram(program);
        if (program.program_name.toLowerCase().indexOf('postpartum') > -1) {
            navigate('/menus/postpartum-plan/servings');
        } else {
            navigate('/menus/next-week/servings');
        }
    }

    return <Grid container direction={'column'} gap={4}
                 sx={{maxWidth: 600, margin: '20px auto'}}>

        <Grid item><Typography variant={'h5'}
                               sx={{fontSize: 22, fontWeight: 800}}
                               color={'primary.main'}>{program.program_name}</Typography></Grid>


        {program.program_name.toLowerCase().indexOf('postpartum') > -1 ?

            <Grid container justifyContent={'space-between'} alignItems={'center'}>
                <Grid item><Typography variant={'h6'}
                                       sx={{fontSize: 14, fontWeight: 800}}
                                       color={'primary.main'}>SERVINGS PER MEALS</Typography>
                    <Typography variant={'body1'}
                                sx={{fontSize: 14}}>Family portion sizes serve about 4-6 people, they’re ideal for
                        feeding a small family. Please specify what kind of serving size you’d like to place an order
                        for.</Typography>
                </Grid>
                <Grid item>
                    <RadioGroup
                        aria-labelledby="subscription-group-label"
                        defaultValue="female"
                        name="subscription-group"
                        onChange={handleChangeServings}
                    >
                        <FormControlLabel
                            control={<Radio size={'small'} value={1}/>}
                            label={'Individual Serving'}
                        />
                        <FormControlLabel
                            control={<Radio size={'small'} value={5}/>}
                            label={'Family Size (4-6)'}
                        />
                    </RadioGroup>
                </Grid>
            </Grid>
            : <Grid container justifyContent={'space-between'} alignItems={'center'}>
                <Grid item><Typography variant={'h6'}
                                       sx={{fontSize: 14, fontWeight: 800}}
                                       color={'primary.main'}>YOUR MEALS</Typography></Grid>
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={program.bld.includes('lunch')}
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
                                checked={program.bld.includes('dinner')}
                                value={'dinner'}
                                onChange={(e) => setOptsMeals(e)}
                            />
                        }
                        label={'Dinner'}
                    />
                </Grid>
            </Grid>
        }

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
                    onChange={handleChangeSubscription}
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

            <Grid item>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={program.use_glass}
                            value={false}
                            onChange={(e) => setOptsGlass(e)}
                        />
                    }
                    label={'$50 for Reusable Glass Containers '}
                />
            </Grid>
        </Grid>

        <ThemedButton onClick={handleSubmit}>
            Next
        </ThemedButton>


    </Grid>
        ;
};

export default ProgramForm;

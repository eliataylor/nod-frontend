import React from 'react';
import {Box, Grid, Typography} from "@mui/material";

const Home = () => {
    return (
        <Box>
            <Box>
                <Typography variant={'h4'} color={'primary'}>ABOUT US</Typography>
                <Typography variant={'subtitle1'}>
                    Our mission is to provide affordable, deeply nourishing meals that promote stable mood and energy
                    levels while prioritizing health and wellness.
                </Typography>
            </Box>
            <Typography variant={'h4'} color={'primary'} margin={'20px 0 0 0'}>VALUES WE LIVE BY</Typography>
            <Grid container justifyContent={'space-between'} spacing={4}>
                <Grid item xs={12} md={4}>
                    <Typography variant={'h6'}>Transparency</Typography>
                    <Typography variant={'body1'}>
                        We believe in empowering our consumers by providing full transparency about the journey their
                        food takes before it reaches their plate. Our commitment to transparency extends to every aspect
                        of our cooking process, from the materials used in cooking to the ingredients selected for
                        high-heat processes. For instance, we opt for non-toxic cookware to mitigate the risk of metal
                        contamination in our food.
                        Moreover, we go the extra mile by disclosing the specific cooking oil or ingredient utilized in
                        preparing your meal, with avocado oil often being our preferred choice.

                        Our vision extends beyond our own kitchen; we envision a future where such detailed information
                        is standard practice, even on restaurant menus. Together, let's pave the way towards a more
                        informed and empowered dining experience.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant={'h6'}>Nutrient Diversity</Typography>
                    <Typography variant={'body1'}>
                        We aim to introduce you to a wide variety of vegetables in every meal, maximizing your exposure
                        to diverse nutrients and flavors in one sitting. Our gut microbiome, which plays a crucial role
                        in our immune system, thrives on this colorful array of plant-based nutrients. By incorporating
                        an abundance of colors and plant sources into your diet each day, we nourish not only your body
                        but also your gut microbiome, promoting optimal health and well-being.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant={'h6'}>Balanced Energy & Mood</Typography>
                    <Typography variant={'body1'}>
                        We recognize the deep connection between mental health and sugar levels in our blood. Take the
                        term "hangry," for example—it reflects how our mood can suffer when we haven't eaten balanced
                        meals. Our dedication goes beyond simply offering nutritious options; we acknowledge that our
                        food choices profoundly affect our well-being.

                        Through balanced, wholesome meals, we aim to stabilize blood sugar levels, promoting not only
                        physical health but also mental clarity and emotional balance. We believe that nourishing the
                        body with the right foods can foster a happier, healthier mind. Let us help you with that.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;

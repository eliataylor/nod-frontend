import React from 'react';
import {Box, Grid} from '@mui/material';
import Review from '../components/Review';

interface ReviewsProps {
    reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={3}>
                {reviews.map((review, index) => (
                    <Grid item xs={12} sm={6} lg={4} key={index}>
                        <Review review={review} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Reviews;

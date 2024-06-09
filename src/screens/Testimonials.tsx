import React, {useEffect, useState} from 'react';
import {CircularProgress, Container, Typography} from '@mui/material';
import Reviews from './Reviews';

interface Review {
    reviewer: string;
    rating: number;
    review: string;
}

const Testimonials: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('/api/testimonials.json');
                const data: Review[] = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Testimonials
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <Reviews reviews={reviews} />
            )}
        </Container>
    );
};

export default Testimonials;

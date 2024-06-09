import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

interface Review {
    reviewer: string;
    rating: number;
    review: string;
    photos?: string[];
}

interface ReviewProps {
    review: Review;
}

const Review: React.FC<ReviewProps> = ({ review }) => {
    const [selectedThumbnail, setSelectedThumbnail] = useState<number>(0);

    const handleThumbnailClick = (index: number) => {
        setSelectedThumbnail(index);
    };

    return (
        <Card>
            {review.photos && review.photos.length > 0 && (
                <CardMedia
                    component="img"
                    image={review.photos[selectedThumbnail]}
                    alt={`${review.reviewer}'s review photo`}
                    height={300}
                />
            )}
            <CardContent>
                <Typography variant="h6" component="div">
                    {review.reviewer}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {`Rating: ${review.rating} ★`}
                </Typography>
                <Typography variant="body2" component="p" sx={{ mt: 1 }}>
                    {review.review}
                </Typography>
                {review.photos && review.photos.length > 1 && (
                    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {review.photos.map((photo, thumbIndex) => {
                            if (thumbIndex === selectedThumbnail) return null;
                            return <CardMedia
                                key={thumbIndex}
                                component="img"
                                image={photo}
                                alt={`Thumbnail ${thumbIndex + 1}`}
                                sx={{
                                    width: 60,
                                    height: 60,
                                    objectFit: 'cover',
                                    borderRadius: 1,
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleThumbnailClick(thumbIndex)}
                            />
                        })}
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default Review;

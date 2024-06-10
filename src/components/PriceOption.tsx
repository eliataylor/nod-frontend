import React from 'react';
import { CardHeader, Box, Typography } from '@mui/material';

interface PriceOptionProps {
    price: number;
    period: string;
    title: string;
    extraLines: string[];
}

const PriceOption: React.FC<PriceOptionProps> = ({ price, period, title, extraLines }) => {
    return (
        <CardHeader
            avatar={
                <Box sx={{ textAlign: 'center', height:35 }}>
                    <Typography variant={'h6'} sx={{ margin: 0 }} color={'primary'}>
                        ${price}
                    </Typography>
                    <Typography variant={'caption'}>
                        {period}
                    </Typography>
                </Box>
            }
            title={title}
            subheader={
                <Box>
                    {extraLines.map((e, i) => <div key={`extra-${i}`}>{e}</div>)}
                </Box>
            }
        />
    );
};

export default PriceOption;

import React, {useEffect, useState} from 'react';
import {Suppliers} from "./CartProvider";
import {Box, Card, CardHeader, Divider, Typography} from "@mui/material";
import {useTheme} from "@mui/styles";
import {Theme} from "@mui/material/styles";

const SupplierList: React.FC = () => {
    const theme = useTheme() as Theme;
    const [suppliers, setSuppliers] = useState<Suppliers>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/supplier?format=json');
                if (!response.ok) {
                    throw new Error('Failed to fetch menu data');
                }
                const data = await response.json();
                setSuppliers(data.results);
            } catch (error) {
                console.error('Error fetching menu data:', error);
                window.alert('Error loading Menu')
            }
        };

        fetchData();
    }, []);

    if (!suppliers) return <div>loading menu...</div>
    if (suppliers.length === 0) return <div>no suppliers</div>

    return (
        <div>
            <Box mb={1}>
                <Typography variant={'h6'}>NOD Suppliers and Food Sources</Typography>
            </Box>
            <Divider />
            {suppliers.map((supplier, index) => {
                const toPass = {title: supplier.name};
                if (supplier.photo) {
                    // @ts-ignore
                    toPass.avatar = <img src={supplier.photo} />
                }
                if (supplier.website) {
                    // @ts-ignore
                    toPass.subheader = supplier.website
                }
                return (
                    <Card key={`${supplier.id}-${supplier.name}`} style={{marginBottom:10, borderRadius:"4px 0 0 0"}}
                    >
                        <CardHeader {...toPass} />
                    </Card>
                )
            })}
        </div>
    );
};

export default SupplierList;

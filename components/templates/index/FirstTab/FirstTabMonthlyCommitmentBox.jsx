import React from 'react'
import { Box, Container, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material'
import ItsAvatar from '@/components/modules/ItsAvatar'
import LinearProgress from '@mui/material/LinearProgress';
import { blue } from '@mui/material/colors';
import { getDistance } from 'geolib';
import { useRouter } from 'next/navigation';


const color = blue[50];
export default function FirstTabMonthlyCommitmentBox({ business, latitude, longitude }) {

    const router = useRouter()
    return (
        <List sx={{ width: '100%', maxWidth: 700, bgcolor: color, borderRadius: 2, m: 1, p: 2 }}>
            <ListItemButton onClick={() => router.push(`/${business.businessName}`)}>
                <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                        <Box sx={{ ml: 2, width: 40, height: 40 }}>
                            <ItsAvatar userCodeOrBusinessBrand={business.businessName} isAvatar={business.isAvatar} alt="workers avatar" />
                        </Box>
                        <ListItemAvatar >
                            <ListItemText align='right' primary={business.businessBrand} secondary={business.businessName} />
                        </ListItemAvatar>
                    </Box>
                    <Typography align='right' variant="caption" sx={{ color: 'text.secondary' }}>{business.bio}</Typography>
                    {
                        latitude &&
                        business?.latitude?.$numberDecimal &&
                        business?.longitude?.$numberDecimal && (
                            <ListItemText
                                primary={(
                                    getDistance(
                                        { latitude, longitude },
                                        {
                                            latitude: parseFloat(business.latitude?.$numberDecimal) || 0,
                                            longitude: parseFloat(business.longitude?.$numberDecimal) || 0
                                        }
                                    ) / 1000
                                ).toFixed()}
                                secondary="km"
                            />
                        )

                    }
                    {business.monthlyCommitment.map((product) => {
                        return (
                            <Box key={product._id}>
                                <Typography fontSize={12} align='right'>{product.product.productName}</Typography>
                                <ListItem dense disablePadding >
                                    <Box sx={{ width: '90%' }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={(product.lastMonthDelivered || 0) / product.amount * 100}
                                        />
                                    </Box>
                                    <Box sx={{ minWidth: 35 }}>
                                        <Typography variant="body2" sx={{ m: 1, color: 'text.secondary' }}>
                                            {(product.lastMonthDelivered || 0) + "/" + product.amount}
                                        </Typography>
                                    </Box>
                                    <Typography fontSize={12} sx={{ mr: 2, color: 'text.secondary' }}>
                                        {product.product.unitOfMeasurement}
                                    </Typography>
                                </ListItem>
                            </Box>
                        )
                    })}
                </Box>
            </ListItemButton>
        </List>
    )
}

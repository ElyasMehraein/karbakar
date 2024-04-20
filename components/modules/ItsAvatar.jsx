"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Avatar, Box, ListItemIcon } from '@mui/material';

export default function ItsAvatar({ userCodeOrBusinessBrand, isAvatar }) {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(false)
    }, []);

    let avatar = `/avatars/${userCodeOrBusinessBrand}.jpg`

    return (
        !isLoading && isAvatar ?

            <Image
                style={{ objectFit: "cover" }}
                src={avatar}
                alt={userCodeOrBusinessBrand}
                quality={100}
                fill
                sizes="100px"
            />

            :
            isNaN(userCodeOrBusinessBrand) ?
                <ListItemIcon style={{ display: 'grid', placeItems: 'center' }}>
                    <BusinessIcon />
                </ListItemIcon>
                :
                <AccountCircle sx={{ width: 30, height: 30 }} />
    )
}
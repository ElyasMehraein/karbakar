"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Avatar, Box, ListItemIcon } from '@mui/material';

export default function ItsAvatar({ userCodeOrBusinessBrand }) {
    const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || business?.avatarUrl)
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(false)
    }, []);
    useEffect(() => {
        if (avatarUrl) {
            setAvatarUrl(`/images/avatars/${userCodeOrBusinessBrand}.jpg?timestamp=${new Date().getTime()}`);
        }
    }, [userCodeOrBusinessBrand]);
    let avatar = `images/avatars/${userCodeOrBusinessBrand}.jpg`
    console.log("avatar", avatar);
    return (
        !isLoading && avatarUrl ?

            <Image
                style={{ objectFit: "cover" }}
                src={avatarUrl}
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
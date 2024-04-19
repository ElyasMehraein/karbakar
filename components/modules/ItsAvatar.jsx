"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Avatar, ListItemIcon } from '@mui/material';

export default function ItsAvatar({ userCodeOrBusinessBrand, isAvatar }) {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(false)
    }, []);

    let avatar = `/avatars/${userCodeOrBusinessBrand}.jpg`

    return (
        !isLoading && isAvatar ?
            <>
                <Avatar>
                    <Image
                        src={avatar}
                        alt={userCodeOrBusinessBrand}
                        quality={100}
                        fill
                        sizes="100px"
                        style={{ objectFit: 'cover' }}
                    />
                </Avatar>
            </>
            :
            isNaN(userCodeOrBusinessBrand) ?
                <ListItemIcon>
                    <BusinessIcon />
                </ListItemIcon>
                :
                <AccountCircle sx={{ width: 30, height: 30 }} />
    )
}
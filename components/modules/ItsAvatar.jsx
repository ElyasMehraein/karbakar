"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';

export default function ItsAvatar({ userCodeOrBusinessBrand }) {
    let isBusiness;
    const [isLoading, setIsLoading] = useState(true);
    const [isAvatar, setIsAvatar] = useState(null);
    console.log("isBusiness", isBusiness, "userCodeOrBusinessBrand", userCodeOrBusinessBrand);

    useEffect(() => {

        const fetchData = async () => {
            const res = await fetch('/api/isAvatarAvalable', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userCodeOrBusinessBrand })
            })
            if (res.status === 200) {
                const { isAvatar } = await res.json()
                setIsAvatar(isAvatar)
            } else if (res.status === 500) {
                console.log("خطای اتصال به سرور")
            }
        }
        fetchData()

        setIsLoading(false)
    }, []);

    let avatarOrBrand = ""
    if (isNaN(userCodeOrBusinessBrand)) {
        avatarOrBrand = "brands";
        isBusiness = true
    } else {
        avatarOrBrand = "avatars";
        isBusiness = false
    }

    let avatar = `/${avatarOrBrand}/${userCodeOrBusinessBrand}.jpg`

    console.log("avatar", avatar);
    return (
        <>
            {!isLoading && isAvatar ?
                <Avatar>
                    <Image
                        src={avatar}
                        alt={userCodeOrBusinessBrand} quality={100}
                        fill
                        sizes="100px"
                        style={{ objectFit: 'cover' }}
                    />
                </Avatar>
                : isBusiness ?
                    <ListItemIcon>
                        <BusinessIcon />
                    </ListItemIcon>
                    :
                    <Avatar  sx={{ width: 30, height: 30, mt: -2 }}>
                        <AccountCircle  sx={{ width: 30, height: 30 }} />
                    </Avatar>

            }
        </>
    )
}
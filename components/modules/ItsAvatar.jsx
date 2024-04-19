"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import AccountCircle from '@mui/icons-material/AccountCircle';
import fetchIsAvatarAvalable from '@/utils/ifAvatarAvalable';

export default function ItsAvatar({ userCodeOrBusinessBrand }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAvatar, setIsAvatar] = useState(false);

    useEffect(() => {
        const fetchIsAvatarAvalable = async () => {
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
        fetchIsAvatarAvalable()
        setIsLoading(false)
    }, []);


    let isBusiness;
    if (isNaN(userCodeOrBusinessBrand)) {
        isBusiness = true
    } else {
        isBusiness = false
    }

    let avatar = `/avatars/${userCodeOrBusinessBrand}.jpg`


    console.log("isLoading", !isLoading, "&& isAvatar", isAvatar)

    return (
        // !isLoading ?
        isAvatar ? <>
            <Image
                src={avatar}
                alt={userCodeOrBusinessBrand} quality={100}
                fill
                sizes="100px"
                style={{ objectFit: 'cover' }}
            />
            {console.log("isAvatar", isAvatar)}
        </>
            :
            isBusiness ?

                <BusinessIcon />
                :
                <AccountCircle sx={{ width: 30, height: 30 }} />
    )
}
"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function ItsAvatar({ userCodeOrBusinessBrand }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAvatar, setIsAvatar] = useState(false);

    useEffect(() => {
    const fetchIsAvatarAvalable = async (yesss) => {
        const res = await fetch('/api/isAvatarAvalable', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userCodeOrBusinessBrand:yesss })
        })
        if (res.status === 200) {
            const { isAvatar } = await res.json()
            console.log("chand ta ", isAvatar);
            setIsAvatar(isAvatar)
        } else if (res.status === 500) {
            console.log("server error")
        }
    }
        fetchIsAvatarAvalable(userCodeOrBusinessBrand)
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
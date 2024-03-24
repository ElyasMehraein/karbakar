"use client"
import Image from 'next/image'
import defaultAvatarImg from "@/public/assets/default/default-avatar.svg"
import { useEffect, useState } from 'react';

export default function ItsAvatar({ userCodeOrBusinessBrand }) {
    const [imageKey, setImageKey] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setImageKey(Date.now());
        setIsLoading(false)
    }, []);

    let avatarOrBrand = ""
    if (isNaN(userCodeOrBusinessBrand)) {
        avatarOrBrand = "brands"
    } else {
        avatarOrBrand = "avatars"
    }

    return <Image
        src={isLoading ? defaultAvatarImg :`/${avatarOrBrand}/${userCodeOrBusinessBrand}.jpg${imageKey ? `?key=${imageKey}` : ''}`}
        alt={userCodeOrBusinessBrand} quality={100}
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
    />
}
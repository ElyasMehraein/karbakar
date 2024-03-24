"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react';

export default function ItsAvatar({ userCodeOrBusinessBrand }) {

    const [imageKey, setImageKey] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const defaultAvatarImg = "/assets/default/default-avatar.svg"
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
    
    let avatar = isLoading ? defaultAvatarImg : `/${avatarOrBrand}/${userCodeOrBusinessBrand}.jpg${imageKey ? `?key=${imageKey}` : ''}`
    return <Image
        src={error ? defaultAvatarImg : avatar}
        alt={userCodeOrBusinessBrand} quality={100}
        fill
        sizes="100px"
        style={{ objectFit: 'cover' }}
        onError={(e) => {
            e.target.onerror = null;
            setError(true);
        }}
    />
}
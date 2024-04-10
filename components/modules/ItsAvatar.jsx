"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';


export default function ItsAvatar({ userCodeOrBusinessBrand }) {

    const [imageKey, setImageKey] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

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
    console.log("avatar", avatar);
    return (
        <>
            {error ?
                <AccountCircle   sx={{ width: 44, height: 44 }}
                />
                :
                <Image
                    src={avatar}
                    alt={userCodeOrBusinessBrand} quality={100}
                    fill
                    sizes="100px"
                    style={{ objectFit: 'cover' }}
                    onError={(e) => {
                        // e.target.onError = null;
                        setError(true);
                    }}
                />
            }
        </>
    )
}
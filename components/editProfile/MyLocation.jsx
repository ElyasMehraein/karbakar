import { Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react'
import { useEffect } from 'react';




export default function MyLocation() {
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [geoLink, setGeoLink] = useState(`https://maps.google.com/?q=1,1`)
    useEffect(() => {

        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
            if (latitude && longitude) {
                setGeoLink(`https://maps.google.com/?q=${latitude},${longitude}`)
                console.log("geoLink updated");
            } else {
                console.log("cant get latitude && longitude");
            }
        });
    })
    return (
        <Link href={geoLink}>لینک موقعیت مکانی</Link>
    )
}

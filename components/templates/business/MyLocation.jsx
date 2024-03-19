"use client"
import { Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react'
import { useEffect } from 'react';

export default function MyLocation() {
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [geoLink, setGeoLink] = useState(`https://maps.google.com/?q=1,1`)
    const saveHandler = async (newValue) => {
        let model = "BillModel"
        let id = bill._id
        let fieldName = "isAccept"
        const res = await fetch("/api/updateDB", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model, id, fieldName, newValue
            }),
        });
        console.log("res", res);
        location.reload()
        res.status === 200 ? setSnackbarAccept(true) : setSnackbarServerError(true)
    }
    useEffect(() => {

        navigator.geolocation.getCurrentPosition(function (position) {

            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
            if (latitude && longitude) {
                setGeoLink(`https://maps.google.com/?q=${latitude},${longitude}`)
            } else {
            }
        });
    })
    return (
        <Link href={geoLink}>لینک موقعیت مکانی</Link>
    )
}

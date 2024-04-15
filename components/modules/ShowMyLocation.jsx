"use client"
import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import { Alert, Container } from '@mui/material';
import { useClientEffect  } from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function ShowMyLocation() {

    const [locationData, setLocationData] = useState(null);
    const [error, setError] = useState(null);
    useClientEffect(() => {
        const handleClick = async () => {
            if (!navigator.geolocation) {
                setError('Geolocation is not supported by your browser.');
                return;
            }

            try {
                const position = await navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        setLocationData(pos.coords);
                    },
                    (err) => {
                        setError(err.message);
                    }
                );
            } catch (error) {
                setError(error.message);
            }
        };

        if (error) {
            return <div>Error: {error}</div>;
        }
        handleClick();
    }, []);
    const buttonSx = {
        ...(locationData && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };


    return (
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Fab
                        aria-label="save"
                        color="primary"
                        sx={buttonSx}
                        onClick={handleClick}
                    >
                        {locationData ? <CheckIcon /> : <PersonPinCircleIcon />}
                    </Fab>
                    {locationData && (
                        <CircularProgress
                            size={68}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                zIndex: 1,
                            }}
                        />
                    )}
                </Box>
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Button
                        variant="contained"
                        sx={buttonSx}
                        // disabled={loading}
                        onClick={handleClick}
                    >
                        {locationData ? "موقعیت شما بروزرسانی شد" : "بروزرسانی موقعیت مکانی"}
                    </Button>
                    {(
                        <CircularProgress
                            size={24}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                </Box>

            </Box>
            <Snackbar
                // open={snackbarOpen}
                autoHideDuration={2000}
            // onClose={() => setSnackbarOpen(false)}
            >
                <Alert variant="filled" icon={<CheckIcon fontSize="inherit" />} severity="success">
                    موقعیت شما به روز است
                </Alert>
            </Snackbar>
            {locationData &&
                <MapContainer center={locationData} zoom={20} scrollWheelZoom={false} style={{ height: "300px" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={locationData}>
                        <Popup>
                            {"برای این آدرس جزئیاتی وارد نشده است"}
                        </Popup>
                    </Marker>
                </MapContainer>
            }
        </Container>
    )
}

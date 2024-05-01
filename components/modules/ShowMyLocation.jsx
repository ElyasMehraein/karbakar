"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import { Alert } from '@mui/material';
import { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Container } from "@mui/material";

export default function EditLocation({setLocation}) {
    const [latitude, setLatitude] = React.useState("")
    const [longitude, setLongitude] = React.useState("")
    const [position, setPosition] = React.useState()

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    function getGeolocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }
    async function saveState() {
        const position = await getGeolocation();
        if (position.coords.latitude !== latitude) {
            setSuccess(false);
            setLoading(true);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        } else {
            setSuccess(true);
            setLoading(false);
            setSnackbarOpen(true)
        }
    }
    async function handleButtonClick() {
        if (!loading) {
            try {
                await saveState()
            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {
        if (latitude && longitude) {
            setPosition([latitude, longitude])
            setSuccess(true);
            setLoading(false);
            setLocation(latitude, longitude)
        }
    }, [latitude, longitude]);

    return (
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Fab
                        aria-label="save"
                        color="primary"
                        sx={buttonSx}
                        onClick={handleButtonClick}
                    >
                        {success ? <CheckIcon /> : <PersonPinCircleIcon />}
                    </Fab>
                    {loading && (
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
                        disabled={loading}
                        onClick={handleButtonClick}
                    >
                        {success ? "موقعیت شما بروزرسانی شد" : "بروزرسانی موقعیت مکانی"}
                    </Button>
                    {loading && (
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
            <Container maxWidth="sm" sx={{ my: 2 }}>
                {position &&
                    <MapContainer center={position} zoom={20} scrollWheelZoom={false} style={{ height: "300px" }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                {"برای این آدرس جزئیاتی وارد نشده است"}
                            </Popup>
                        </Marker>
                    </MapContainer>
                }
            </Container>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert variant="filled" icon={<CheckIcon fontSize="inherit" />} severity="success">
                    موقعیت شما به روز است
                </Alert>
            </Snackbar>
        </Container >
    )
}

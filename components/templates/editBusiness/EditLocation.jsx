"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import { Alert, Container } from '@mui/material';
import { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function EditLocation({ business }) {
    const [latitude, setLatitude] = React.useState("")
    const [longitude, setLongitude] = React.useState("")
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
            saveHandler("latitude", latitude);
            saveHandler("longitude", longitude);
            setSuccess(true);
            setLoading(false);
        }
    }, [latitude, longitude]);

    const saveHandler = async (fieldName, newValue) => {
        let model = "BusinessModel"
        let id = business._id
        const res = await fetch("/api/updateDB", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model, id, fieldName, newValue
            }),
        });
    }
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

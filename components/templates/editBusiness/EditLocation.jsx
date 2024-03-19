"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import { Chip, Container, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

export default function EditLocation() {
    const [latitude, setLatitude] = React.useState("")
    const [longitude, setLongitude] = React.useState("")
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
        }
    };

    function getGeolocation() {
        try {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log("position.coords", position.coords.longitude, position.coords.latitude);
                setLatitude(position.coords.latitude)
                setLongitude(position.coords.longitude)
                saveHandler("latitude")
                saveHandler("longitude")

            })
        } catch (error) {
            console.log("error while adding geolocation to DB", error);
        }
    };
    const saveHandler = async (fieldName) => {
        let model = user ? "UserModel" : "BusinessModel"
        let id = user ? user._id : business._id
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
                        {success ? <CheckIcon /> : <SaveIcon />}
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
                        Accept terms
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

                <Box sx={{ '& .MuiTextField-root': { width: '25ch' } }}
                    display="flex" alignItems="center" align='center'>
                    <PersonPinCircleIcon fontSize="large" /></Box>
                <Box sx={{ width: '7ch', mx: 3 }}><Typography sx={{ fontSize: "14px" }}>موقعیت مکانی</Typography></Box>
                <Chip
                    label="بروزرسانی موقعیت مکانی"
                    sx={{ direction: 'ltr' }}
                    onClick={() => { getGeolocation(); setExpandedMyLocation(false) }}
                    icon={<DoneIcon />}
                />

            </Box>
        </Container >
    )
}

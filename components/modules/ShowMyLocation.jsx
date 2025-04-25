'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { green } from '@mui/material/colors'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import CheckIcon from '@mui/icons-material/Check'
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle'
import { Alert } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Container } from '@mui/material'
import { triggerSnackbar } from '@/utils/snackbarService'

export default function EditLocation({ setLocation }) {
  const [latitude, setLatitude] = React.useState(null)
  const [longitude, setLongitude] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)

  const position = React.useMemo(
    () => (latitude && longitude ? [latitude, longitude] : null),
    [latitude, longitude]
  )

  const buttonSx = success ? { bgcolor: green[500], '&:hover': { bgcolor: green[700] } } : {}

  function getGeolocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }

  async function saveState() {
    try {
      setLoading(true)
      setSuccess(false)
      const { coords } = await getGeolocation()
      setLatitude(coords.latitude)
      setLongitude(coords.longitude)
    } catch (error) {
      switch (error.code) {
        case 1:
          triggerSnackbar('لطفا دسترسی به موقعیت مکانی خود را فعال کنید', 'error')
          break
        case 2:
          triggerSnackbar('عدم امکان دسترسی به اینترنت', 'error')
          break
        case 3:
          triggerSnackbar('دریافت موقعیت جغرافیایی زمان بر شد', 'error')
          break
      }
      console.error(error)
    } finally {
      setTimeout(() => {
        setLoading(false)
        setSuccess(true)
      }, 500)
    }
  }

  function handleButtonClick() {
    if (!loading) {
      saveState()
    } else {
      triggerSnackbar('لطفا کمی صبر کنید')
    }
  }

  React.useEffect(() => {
    if (position) {
      setSuccess(true)
      setLocation(...position)
    }
  }, [position, setLocation])

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ m: 1, position: 'relative' }}>
          <Fab aria-label="save" color="primary" sx={buttonSx} onClick={handleButtonClick}>
            {success ? <CheckIcon /> : <PersonPinCircleIcon />}
          </Fab>
          {loading && (
            <CircularProgress
              size={68}
              sx={{ color: green[500], position: 'absolute', top: -6, left: -6, zIndex: 1 }}
            />
          )}
        </Box>
        <Box sx={{ m: 1, position: 'relative' }}>
          <Button variant="contained" sx={buttonSx} disabled={loading} onClick={handleButtonClick}>
            {success ? 'موقعیت شما بروزرسانی شد' : 'بروزرسانی موقعیت مکانی'}
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
      {position && (
        <Container maxWidth="sm" sx={{ my: 2 }}>
          <MapContainer
            center={position}
            zoom={20}
            scrollWheelZoom={false}
            style={{ height: '300px' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>{'برای این آدرس جزئیاتی وارد نشده است'}</Popup>
            </Marker>
          </MapContainer>
        </Container>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={() => setSnackbarOpen(false)}>
        <Alert variant="filled" icon={<CheckIcon fontSize="inherit" />} severity="success">
          موقعیت شما به روز است
        </Alert>
      </Snackbar>
    </Container>
  )
}

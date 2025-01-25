"use client"
import { AppBar, Box, Button, Container, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, TextField, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AllBusinessesText, selectGuild } from '@/components/typoRepo';
import { Accordion, AccordionDetails, Chip } from "@mui/material";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ItsAvatar from '@/components/modules/ItsAvatar'
import dynamic from 'next/dynamic'
import { orderByDistance, getDistance } from 'geolib';

const ShowMyLocation = dynamic(() => import('@/components/modules/ShowMyLocation'), { ssr: false })


export default function AllBusinesses() {

  const router = useRouter()
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [businesses, setBusinesses] = useState(false);
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [businessesOrderByDistance, setBusinessesOrderByDistance] = useState([])

  console.log("businessesOrderByDistance", businessesOrderByDistance);

  const setLocation = function (latitude, longitude) {
    setLatitude(latitude)
    setLongitude(longitude)
  }

  useEffect(() => {
    const getBusinesses = async () => {
      try {
        const res = await fetch("/api/allBusinesses", { method: "GET" })
        if (res.status === 200) {
          const data = await res.json()
          setBusinesses(data.data)
        } else if ((res.status === 403)) {
          console.log("unauthorized access");
        }
      } catch (error) {
        console.error("Error fetching Businesses:", error);
      }
    }
    getBusinesses()
    setMounted(true)

  }, [])

  useEffect(() => {
    if (businesses || latitude) {
      setBusinessesOrderByDistance(orderByDistance({ latitude, longitude },
        businesses.filter((business) => (business.latitude)).map((business) => (
          {
            latitude: business.latitude, longitude: business.longitude, ...business,
          }))))
    };
  }, [latitude, longitude, businesses]);

  const goToIndex = () => {
    router.push("/")
  }

  return (mounted &&
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={goToIndex}
            >
              <ArrowForwardIcon />
              <Typography sx={{ mx: 1 }} component="div" >
                بازگشت
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="md">
        <Box className='inMiddle'
          sx={{
            '& .MuiTextField-root': { width: '30ch' },
            my: 3
          }}
          display="flex" flexDirection="column">
          <Accordion sx={{ boxShadow: 0 }} expanded={expanded}>
            <Chip
              label="راهنمایی"
              sx={{ direction: 'ltr' }}
              onClick={() => setExpanded(!expanded)}
              icon={<QuestionMarkOutlinedIcon sx={{ fontSize: 16 }} />}
            />
            <AccordionDetails>
              <AllBusinessesText />
            </AccordionDetails>
          </Accordion>
          <ShowMyLocation setLocation={setLocation} />
          {businesses ?
            businessesOrderByDistance.length ?
              businessesOrderByDistance.map((business) => {
                return (
                  <List key={business._id} sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
                    <ListItemButton onClick={() => router.push(`/${business.businessName}`)}>
                      <ListItemAvatar>
                        <ItsAvatar userCodeOrBusinessBrand={business.businessName} alt="workers avatar" />
                      </ListItemAvatar>
                      <ListItem dense secondaryAction={<ListItemText sx={{ ml: 5 }} align="right" primary={business.businessBrand} secondary={business.bio} />} >
                        <ListItemText
                          primary={(getDistance({ latitude, longitude }, { latitude: business.latitude.$numberDecimal, longitude: business.longitude.$numberDecimal }) / 1000).toFixed()}
                          secondary="km"
                        />

                      </ListItem>
                    </ListItemButton>
                  </List>
                )
              })
              :
              businesses.map((business) => {
                console.log("hahiii");
                return (
                  <List key={business._id} sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
                    <ListItemButton onClick={() => router.push(`/${business.businessName}`)}>
                      <ListItemAvatar>
                        <ItsAvatar userCodeOrBusinessBrand={business.businessName} alt="workers avatar" />
                      </ListItemAvatar>
                      <ListItem dense secondaryAction={<ListItemText sx={{ ml: 5 }} align="right" primary={business.businessName} secondary={business.bio} />} >
                      </ListItem>
                    </ListItemButton>
                  </List>
                )
              }) :
            <Typography>کسب و کاری برای نمایش وجود ندارد </Typography>
          }
        </Box>
      </Container>
    </>
  )

}

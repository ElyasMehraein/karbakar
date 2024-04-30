"use client"
import { AppBar, Avatar, Box, Button, Container, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, TextField, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AllBusinessesText, selectGuild } from '@/components/typoRepo';
import { Accordion, AccordionDetails, Chip } from "@mui/material";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ItsAvatar from '@/components/modules/ItsAvatar'
// import dynamic from 'next/dynamic'
// const ShowMyLocation = dynamic(() => import('@/components/modules/ShowMyLocation'), { ssr: false })


export default function AllBusinesses() {
  const router = useRouter()
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [businesses, setBusinesses] = useState(false);
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
          {businesses ? businesses.map((business) => {
            return (
              <List key={business._id} sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
                <ListItem>
                  <ListItemButton onClick={() => router.push(`/${business.businessName}`)}>
                    <ListItemAvatar>
                      <Avatar>
                        <ItsAvatar userCodeOrBusinessBrand={business.businessName} isAvatar={business.isAvatar} alt="workers avatar" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText align='right' primary={business.businessBrand} secondary={business.bio} />
                  </ListItemButton>
                </ListItem>
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
